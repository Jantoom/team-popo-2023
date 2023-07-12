import json, os, subprocess
from celery import Celery, Task
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from src.core import db
from src.core.models import Violation, StatusEnum, TypeEnum

flask = Flask(__name__)
flask.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///db.sqlite')
db = SQLAlchemy()
db.init_app(flask)

celery = Celery(__name__) 
celery.conf.broker_url = os.getenv('CELERY_BROKER_URL')
celery.conf.result_backend = os.getenv('CELERY_RESULT_BACKEND')
celery.conf.task_default_queue = os.getenv('CELERY_DEFAULT_QUEUE', 'popo-model') 

class ClassifyViolationTask(Task):
    def run(self, image, id):
        with open('input.jpg', 'w') as image_file:
            json.dump(image, image_file)
        result = subprocess.run(['pipenv', 'run', 'src/__init__.py', 'input.jpg'], capture_output=True)
        result = result.stdout.decode('utf-8') == 'True'

        with open('output.jpg', 'r') as mask_file:
            mask_image = mask_file.read()

        return {'result': result, 'mask_image': mask_image}
        
    def on_success(self, retval, task_id, args, kwargs):
        with flask.app_context():
            db.session.execute(db.
                update(Violation).
                where(Violation.id == args[1]).
                values(
                    predicted_type=TypeEnum.TWO_SPACES.value,
                    status=StatusEnum.CLASSIFIED.value
                ))
            db.session.commit()

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        with flask.app_context():
            db.session.execute(db.
                update(Violation).
                where(Violation.id == args[1]).
                values(
                    predicted_type=TypeEnum.NONE.value,
                    status=StatusEnum.ERROR.value
                ))
            db.session.commit()

classify_violation_task = celery.register_task(ClassifyViolationTask())
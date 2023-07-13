import os, subprocess, boto3, random, string
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

BUCKET_NAME = os.getenv('S3_BUCKET', None) # Set your S3 bucket name in code/docker-compose.env
S3 = boto3.client('s3')

class ClassifyViolationTask(Task):
    def run(self, id, resource_url):
        # Save image to storage
        with open('input.jpg', 'wb') as input:
            S3.download_fileobj(BUCKET_NAME, resource_url, input)
        # Predict
        prediction = subprocess.run(['python3', '__init__.py'], capture_output=True)
        # #result = subprocess.run(['ls', '-LR'], capture_output=True)
        # raise Exception(f'{result.stdout}\n{result.stderr}')
        prediction = prediction.stdout.decode('utf-8').split('\n')[-1] == 'True'
        # Load masked image
        with open('output.jpg', 'rb') as output:
            random_string = ''.join(random.choice(string.ascii_uppercase) for _ in range(10))
            key_name = f'{resource_url}_masked_{random_string}'
            S3.upload_fileobj(output, BUCKET_NAME, key_name)
        # Update violation in database
        with flask.app_context():
            db.session.execute(db.
                update(Violation).
                where(Violation.id == id).
                values(
                    predicted_type=TypeEnum.TWO_SPACES.value, # Eventually swap with prediction when it supports multiple classes
                    status=StatusEnum.CLASSIFIED.value,
                    masked_url=key_name
                ))
            db.session.commit()

        return {'prediction': prediction, 'masked_url': key_name}
        
    def on_success(self, retval, task_id, args, kwargs):
        pass

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        with flask.app_context():
            db.session.execute(db.
                update(Violation).
                where(Violation.id == args[0]).
                values(
                    predicted_type=TypeEnum.NONE.value,
                    status=StatusEnum.ERROR.value
                ))
            db.session.commit()

classify_violation_task = celery.register_task(ClassifyViolationTask())

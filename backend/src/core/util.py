import traceback, os, secrets, datetime
from base64 import b64encode
from flask import Flask, request
from flask_cors import CORS
from marshmallow import Schema
from core import db, jwt_manager, ma
from core.models import User

@jwt_manager.user_identity_loader
def load_user(user_id) -> User:
    user = db.session.scalars(db.
            select(User).
            where(User.id == user_id)).first()
    return user.id

def create_default_app(config_overrides=None) -> Flask:
    app = Flask(__name__)
    CORS(app)

    app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY', secrets.token_urlsafe())
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=24)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///db.sqlite')

    if config_overrides:
        app.config.update(config_overrides)

    # Load the models
    from core.models import User, Violation
    db.init_app(app)
    ma.init_app(app)
    jwt_manager.init_app(app)

    # Create the tables
    with app.app_context(): 
        db.create_all()
        db.session.commit()

    return app

def parse_input(schema: Schema) -> dict:
    params = dict()
    # Route
    params.update(request.view_args)
    # JSON
    params.update(request.get_json(silent=True) if request.is_json else dict())
    # Query
    params.update(request.args.to_dict())
    # Form
    params.update(request.form.to_dict())
    # File
    params.update({key: b64encode(value.read()).decode('utf-8') for key, value in request.files.items()})

    return schema.load(params)

def unknown_error(e):
    return 'An unknown error occurred trying to process the request.' + \
        f'\nMessage: {e}' + \
        f'\n{traceback.format_exc()}', 500
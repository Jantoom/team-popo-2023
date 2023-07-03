from flask import Blueprint
from core.util import create_default_app

api = Blueprint('api', __name__, url_prefix='/api/v1/users')

def create_app(config_overrides=None):
    app = create_default_app(config_overrides)
    
    # Enable the endpoints
    from auth.routes import user_routes
    app.register_blueprint(api)

    return app

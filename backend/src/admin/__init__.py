from flask import Blueprint
from src.core.util import create_default_app

api = Blueprint('admin_api', __name__, url_prefix='/api/v1/admin')

def create_app(config_overrides=None):
    app = create_default_app(config_overrides)
    
    # Enable the endpoints
    from src.admin.routes import admin_routes
    app.register_blueprint(api)

    return app

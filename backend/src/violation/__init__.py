from flask import Blueprint
from core.util import create_default_app

api = Blueprint('api', __name__, url_prefix='/api/v1/violations')

def create_app(config_overrides=None):
    app = create_default_app(config_overrides)
    
    # Enable the endpoints
    from violation.routes import violation_list_routes, violation_routes
    app.register_blueprint(api)

    return app

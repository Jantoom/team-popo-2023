from src.core.util import create_default_app

def create_app(config_overrides=None):
    app = create_default_app(config_overrides)
    
    # Enable the endpoints
    from src.admin.routes import admin_routes
    from src.auth.routes import auth_routes
    from src.violations.routes import violation_list_routes, violation_routes
    from src.admin import api as admin_api
    from src.auth import api as auth_api
    from src.violations import api as violations_api
    app.register_blueprint(admin_api)
    app.register_blueprint(auth_api)
    app.register_blueprint(violations_api)

    return app

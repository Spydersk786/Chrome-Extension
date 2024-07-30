from .credentials_routes import credentials_bp
from .urls_routes import urls_bp

def register_routes(app):
    app.register_blueprint(credentials_bp)
    app.register_blueprint(urls_bp)
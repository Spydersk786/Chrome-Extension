from .credentials_routes import credentials_bp
from .urls_routes import urls_bp
from .screenshots_route import screenshots_bp
from .audios_routes import audios_bp

def register_routes(app):
    app.register_blueprint(credentials_bp)
    app.register_blueprint(urls_bp)
    app.register_blueprint(screenshots_bp)
    app.register_blueprint(audios_bp)
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db   # ✅ import the SAME db
from routes.auth import auth_bp
from routes.cases import cases_bp

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///missing_persons.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "super-secret-key"

    # Initialize extensions
    db.init_app(app)      # ✅ very important
    CORS(app)
    JWTManager(app)

    # Register routes
    app.register_blueprint(auth_bp, url_prefix="/auth")

    app.register_blueprint(cases_bp, url_prefix="/api")

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)


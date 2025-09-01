from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email already registered"}), 400

    user = User(email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if user and user.check_password(data["password"]):
        # ✅ Convert user.id to string for JWT
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": access_token}), 200

    return jsonify({"msg": "Invalid credentials"}), 401

from flask import Blueprint, request, jsonify
from models import db, MissingCase
from flask_jwt_extended import jwt_required, get_jwt_identity

cases_bp = Blueprint("cases", __name__)

@cases_bp.route("/cases", methods=["POST"])
@jwt_required()
def create_case():
    # ✅ Convert back to int when using it
    user_id = int(get_jwt_identity())
    data = request.get_json()
    case = MissingCase(
        full_name=data["full_name"],
        age=data["age"],
        description=data["description"],
        last_seen_location=data["last_seen_location"],
        user_id=user_id,
    )
    db.session.add(case)
    db.session.commit()
    return jsonify({"msg": "Case reported successfully"}), 201


@cases_bp.route("/cases", methods=["GET"])
@jwt_required()
def get_cases():
    cases = MissingCase.query.all()
    return jsonify([
        {
            "id": c.id,
            "full_name": c.full_name,
            "age": c.age,
            "description": c.description,
            "last_seen_location": c.last_seen_location,
            "date_reported": c.date_reported.isoformat(),  # ✅ JSON safe
            "user_id": c.user_id,
        } for c in cases
    ])


@cases_bp.route("/cases/<int:id>", methods=["PUT"])
@jwt_required()
def update_case(id):
    user_id = int(get_jwt_identity())
    case = MissingCase.query.get_or_404(id)
    if case.user_id != user_id:
        return jsonify({"msg": "Not authorized"}), 403

    data = request.get_json()
    case.full_name = data.get("full_name", case.full_name)
    case.age = data.get("age", case.age)
    case.description = data.get("description", case.description)
    case.last_seen_location = data.get("last_seen_location", case.last_seen_location)
    db.session.commit()
    return jsonify({"msg": "Case updated successfully"})


@cases_bp.route("/cases/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_case(id):
    user_id = int(get_jwt_identity())
    case = MissingCase.query.get_or_404(id)
    if case.user_id != user_id:
        return jsonify({"msg": "Not authorized"}), 403
    db.session.delete(case)
    db.session.commit()
    return jsonify({"msg": "Case deleted successfully"})

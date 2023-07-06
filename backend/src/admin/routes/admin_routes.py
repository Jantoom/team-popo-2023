from flask import jsonify
from flask_jwt_extended import jwt_required
from src.core.util import parse_input, unknown_error
from src.admin import api
from src.admin.schemas import GetUserListRequest, DeleteViolationRequest
from src.admin.services import admin_service

@api.route('/users', methods=['GET'])
@jwt_required()
def get_user_list():
    """List all the users."""
    try:
        input = parse_input(GetUserListRequest())
        result = []
        for user in admin_service.get_users(input):
            result.append(user.to_dict())
        return jsonify(result), 200
    except Exception as e:
        return unknown_error(e)

@api.route('/<string:violation_id>', methods=['DELETE'])
@jwt_required()
def delete_violation(violation_id):
    """Deletes all references to an violation."""
    try:
        input = parse_input(DeleteViolationRequest())
        violation = admin_service.delete_violation(input)
        if violation is not None:
            return 'Successfully deleted violation.', 201
        else:
            return 'Failed to delete violation.', 400
    except Exception as e:
        return unknown_error(e)
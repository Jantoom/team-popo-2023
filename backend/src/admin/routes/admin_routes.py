from flask import jsonify
from flask_jwt_extended import jwt_required
from backend.src.core.services import violation_service
from src.core.util import unknown_error
from src.core.schemas import parse_input
from src.core.services import user_service
from src.admin import api
from src.admin.schemas import GetUserListRequest, DeleteViolationRequest

@api.route('/users', methods=['GET'])
@jwt_required()
def get_user_list():
    """List all the users."""
    try:
        input = parse_input(GetUserListRequest())
        result = []
        for user in user_service.get_users(input):
            result.append(user.to_dict())
        return jsonify(result), 200
    except Exception as e:
        return unknown_error(e)

@api.route('/<string:violation_id>', methods=['DELETE'])
@jwt_required()
def delete_violation(asset_id):
    """Deletes all references to an violation."""
    try:
        input = parse_input(DeleteViolationRequest())
        violation = violation_service.delete_violation(input)
        if violation is not None:
            return 'Successfully deleted violation.', 201
        else:
            return 'Failed to delete violation.', 400
    except Exception as e:
        return unknown_error(e)
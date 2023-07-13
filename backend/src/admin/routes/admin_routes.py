from flask import jsonify
from flask_jwt_extended import jwt_required
from src.core.util import parameters, unknown_error
from src.admin import api
from src.admin.schemas import GetUserListRequest, GetUserListResponse, \
    DeleteViolationRequest, DeleteViolationResponse, ResetDatabaseRequest, ResetDatabaseResponse
from src.admin.services import admin_service

@api.route('/users', methods=['GET'])
@jwt_required()
def get_user_list():
    """List all the users."""
    try:
        input = GetUserListRequest().load(parameters())
        users = admin_service.get_users(input)
        return jsonify(
            message='',
            users=GetUserListResponse(many=True).dump(users)
        ), 200
    except Exception as e:
        return unknown_error(e)

@api.route('/<string:violation_id>', methods=['DELETE'])
@jwt_required()
def delete_violation(violation_id):
    """Deletes all references to an violation."""
    try:
        input = DeleteViolationRequest().load(parameters())
        violation = admin_service.delete_violation(input)
        return jsonify(
            message='Successfully deleted violation.', 
            violation=DeleteViolationResponse.dump(violation)
        ), 201
        return 'Failed to delete violation.', 400
    except Exception as e:
        return unknown_error(e)
    
@api.route('/reset_database', methods=['GET'])
@jwt_required()
def reset_database():
    """Reset all tables by dropping and re-creating them."""
    try:
        input = ResetDatabaseRequest().load(parameters())
        foo = admin_service.reset_database(input)
        return jsonify(
            message='Successfully reset databases.',
            dummy=ResetDatabaseResponse().dump({})
        ), 200
    except Exception as e:
        return unknown_error(e)
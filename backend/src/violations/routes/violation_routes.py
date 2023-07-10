from flask import jsonify
from flask_jwt_extended import jwt_required
from src.core.util import parameters, unknown_error
from src.violations import api
from src.violations.schemas import GetViolationRequest, GetViolationResponse, DeleteViolationRequest, DeleteViolationResponse
from src.violations.services import violations_service

@api.route('/<string:violation_id>', methods=['GET'])
@jwt_required()
def get_violation(violation_id):
    """Get details for a particular violation."""
    try:
        input = GetViolationRequest().load(parameters())
        violation = violations_service.get_violation(input)
        return jsonify(
            message='',
            violation=GetViolationResponse().dump(violation)
        ), 200
        return 'Violation does not exist.', 404
    except Exception as e:
        return unknown_error(e)
    
@api.route('/<string:violation_id>', methods=['DELETE'])
@jwt_required()
def delete_violation(violation_id):
    """Deletes an violation associated with the session account."""
    try:
        input = DeleteViolationRequest().load(parameters())
        violation = violations_service.delete_violation(input)
        return jsonify(
            message='Successfully deleted violation.',
            violation=DeleteViolationResponse().dump(violation)
        ), 201
        return 'Failed to delete violation.', 400
    except Exception as e:
        return unknown_error(e)

from flask import jsonify
from flask_jwt_extended import jwt_required
from src.core.util import parse_input, unknown_error
from src.violations import api
from src.violations.schemas import GetViolationRequest, DeleteViolationRequest
from src.violations.services import violations_service

@api.route('/<string:violation_id>', methods=['GET'])
@jwt_required()
def get_violation(violation_id):
    """Get details for a particular violation."""
    try:
        input = parse_input(GetViolationRequest())
        violation = violations_service.get_violation(input)
        if violation:
            return jsonify(violation.to_dict()), 200
        else:
            return 'Violation does not exist.', 404
    except Exception as e:
        return unknown_error(e)
    
@api.route('/<string:violation_id>', methods=['DELETE'])
@jwt_required()
def delete_violation(violation_id):
    """Deletes an violation associated with the session account."""
    try:
        input = parse_input(DeleteViolationRequest())
        userViolation = violations_service.delete_violation(input)
        if userViolation is not None:
            return 'Successfully deleted violation.', 201
        else:
            return 'Failed to delete violation.', 400
    except Exception as e:
        return unknown_error(e)

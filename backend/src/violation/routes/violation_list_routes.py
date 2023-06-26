from botocore.exceptions import ClientError
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from src.core.schemas import parse_input
from src.core.services import violation_service
from src.core.util import unknown_error
from src.violation import api
from src.violation.schemas import GetViolationListRequest, UploadViolationRequest

@api.route('', methods=['GET'])
@jwt_required()
def get_violation_list():
    """List all the violations registered with Dijo."""
    try:
        input = parse_input(GetViolationListRequest())
        violations, total_violation_count = violation_service.get_violations(input)
        violation_result = []
        for violation in violations:
            presigned_url = violation_service.create_presigned_url(violation.resource_url)
            violation_dict = violation.to_dict()
            violation_dict['presigned_url'] = presigned_url
            violation_result.append(violation_dict)
        return jsonify({
            "violations": violation_result,
            "total_violation_count": total_violation_count
            }), 200
    except Exception as e:
        return unknown_error(e)

@api.route('', methods=['POST'])
@jwt_required()
def upload_violation():
    """Upload a new violation to the marketplace."""
    try:
        input = parse_input(UploadViolationRequest())
        input['resource_url'] = violation_service.upload_violation_to_s3_bucket(input) # Consider hiding in upload_violation() as a helper function
        violation = violation_service.upload_violation(input)
        if violation is not None:
            return jsonify(violation.to_dict()), 201
        else:
            return 'Failed to upload violation.', 400
    except ClientError as e:
        return f'Failed to upload violation to S3 bucket. Reason: {e}', 400
    except Exception as e:
        return unknown_error(e)

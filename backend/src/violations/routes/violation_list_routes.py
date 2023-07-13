from botocore.exceptions import ClientError
from flask import jsonify
from flask_jwt_extended import jwt_required
from src.core.util import parameters, unknown_error
from src.violations import api
from src.violations.schemas import GetViolationListRequest, GetViolationListResponse, UploadViolationRequest, UploadViolationResponse
from src.violations.services import violations_service

@api.route('', methods=['GET'])
@jwt_required()
def get_violation_list():
    """List all the violations registered with Dijo."""
    try:
        input = GetViolationListRequest().load(parameters())
        violations = violations_service.get_violations(input)
        return jsonify(
            message='',
            violations=GetViolationListResponse(many=True).dump(violations)
        ), 200
    except Exception as e:
        return unknown_error(e)

@api.route('', methods=['POST'])
@jwt_required()
def upload_violation():
    """Upload a new violation to the marketplace."""
    try:
        input = UploadViolationRequest().load(parameters())
        violation, mask_image = violations_service.upload_violation(input)
        return jsonify(
            message='Successfully uploaded violation.',
            violation=UploadViolationResponse().dump(violation),
            mask_image=mask_image
        ), 201
        return 'Failed to upload violation.', 400
    except ClientError as e:
        return f'Failed to upload violation to S3 bucket. Reason: {e}', 400
    except Exception as e:
        return unknown_error(e)

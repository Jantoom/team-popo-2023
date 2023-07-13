from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import Violation
from src.violations.services import violations_service

class GetViolationRequest(Schema):
    violation_id = fields.String(required=True)

class GetViolationResponse(SQLAlchemySchema):
    presigned_url = fields.Function(lambda violation: violations_service.create_presigned_url(violation.resource_url))
    presigned_masked_url = fields.Function(lambda violation: violations_service.create_presigned_url(violation.masked_url))

    class Meta:
        model = Violation
        ordered = True
        fields = ('id', 'user_id', 'date_created', 
                  'input_type', 'predicted_type', 'status', 
                  'extra_comments', 'presigned_url', 'presigned_masked_url')

from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import Violation

class GetViolationRequest(Schema):
    violation_id = fields.String(required=True)

class GetViolationResponse(SQLAlchemySchema):
    class Meta:
        model = Violation
        ordered = True
        fields = ('id', 'user_id', 'date_created', 
                  'input_type', 'predicted_type', 'status', 
                  'extra_comments')

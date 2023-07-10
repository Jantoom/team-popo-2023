from flask_jwt_extended import get_jwt_identity
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import Violation

class DeleteViolationRequest(Schema):
    user_id = fields.String(load_default=lambda: get_jwt_identity())
    violation_id = fields.String(required=True)

class DeleteViolationResponse(SQLAlchemySchema):
    class Meta:
        model = Violation
        ordered = True
        fields = ('id', 'user_id', 'date_created', 
                  'input_type', 'predicted_type', 'status', 
                  'extra_comments')

from base64 import b64decode
from flask_jwt_extended import get_jwt_identity
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import Violation

class UploadViolationRequest(Schema):
    user_id = fields.String(load_default=lambda: get_jwt_identity())
    image = fields.Function(required=True, deserialize=lambda data: b64decode(data))
    type = fields.String(load_default='NONE')
    extra_comments = fields.String(load_default='')

class UploadViolationResponse(SQLAlchemySchema):
    class Meta:
        model = Violation
        ordered = True
        fields = ('id', 'user_id', 'date_created', 
                  'input_type', 'predicted_type', 'status', 
                  'extra_comments')

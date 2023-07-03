from base64 import b64decode
from marshmallow import Schema, fields, validate
from flask_jwt_extended import get_jwt_identity

class UploadViolationRequest(Schema):
    # user_id = fields.String(load_default=lambda: get_jwt_identity())
    image = fields.Function(required=True, deserialize=lambda data: b64decode(data))
    type = fields.String(load_default='NONE')
    extra_comments = fields.String(load_default='')

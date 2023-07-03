from marshmallow import Schema, fields, validate
from core.models import User

class LoginUserRequest(Schema):
    username = fields.String(required=True, validate=validate.Length(min=1, max=User.username.type.length))
    password = fields.String(required=True, validate=validate.Length(min=1))

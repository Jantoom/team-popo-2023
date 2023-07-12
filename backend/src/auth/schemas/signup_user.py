from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import User

class SignupUserRequest(Schema):
    email = fields.Email(required=True)
    username = fields.String(required=True, validate=validate.Length(min=1, max=User.username.type.length))
    password = fields.String(required=True, validate=validate.Length(min=1))

class SignupUserResponse(SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True
        fields = ('id', 'email', 'username', 
                  'points')
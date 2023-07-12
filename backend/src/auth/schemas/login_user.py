from flask_jwt_extended import create_access_token
from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import User

class LoginUserRequest(Schema):
    username = fields.String(required=True, validate=validate.Length(min=1, max=User.username.type.length))
    password = fields.String(required=True, validate=validate.Length(min=1))

class LoginUserResponse(SQLAlchemySchema):
    access_token = fields.Function(lambda user: create_access_token(identity=user.id))

    class Meta:
        model = User
        ordered = True
        fields = ('id', 'points', 'access_token')
from flask_jwt_extended import get_jwt_identity
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import User

class LogoutUserRequest(Schema):
    user_id = fields.String(load_default=lambda: get_jwt_identity())
    username = fields.String(required=True)

class LogoutUserResponse(SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True
        fields = ['id']
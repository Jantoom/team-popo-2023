from flask_jwt_extended import get_jwt_identity
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from src.core.models import User

class GetUserListRequest(Schema):
    user_id = fields.String(load_default=lambda: get_jwt_identity())

class GetUserListResponse(SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True
        fields = ('id', 'email', 'username', 'password_hash', 
                  'points')
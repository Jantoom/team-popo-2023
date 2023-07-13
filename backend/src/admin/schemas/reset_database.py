from flask_jwt_extended import get_jwt_identity
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema

class ResetDatabaseRequest(Schema):
    user_id = fields.String(load_default=lambda: get_jwt_identity())

class ResetDatabaseResponse(SQLAlchemySchema):
    pass
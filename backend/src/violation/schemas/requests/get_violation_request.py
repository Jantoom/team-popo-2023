from marshmallow import Schema, fields

class GetViolationRequest(Schema):
    asset_id = fields.String(required=True)

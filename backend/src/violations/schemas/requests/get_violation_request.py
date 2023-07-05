from marshmallow import Schema, fields

class GetViolationRequest(Schema):
    violation_id = fields.String(required=True)

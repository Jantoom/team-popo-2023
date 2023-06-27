import uuid
from datetime import datetime
from core.services import db

class Violation(db.Model):
    __tablename__ = 'violations'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    resource_url = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(30), default=None)
    status = db.Column(db.String(15), nullable=False, default='UPLOADED')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'resource_url': self.resource_url,
            'type': self.type,
            'status': self.status
        }
    
    def __repr__(self):
        return f'<Asset({self.id}, {self.user_id}, {self.created_at}, {self.resource_url}, {self.type}, {self.status})>'
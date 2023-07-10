import uuid, enum, datetime
from src.core import db

class TypeEnum(enum.Enum):
    NONE = 'NONE'
    TWO_SPACES = 'TWO_SPACES'
    
class StatusEnum(enum.Enum):
    NONE = 'NONE'
    INCOMPLETE = 'INCOMPLETE'
    COMPLETE = 'COMPLETE'
    UPLOADED = 'UPLOADED'
    CLASSIFYING = 'CLASSIFYING'
    CLASSIFIED = 'CLASSIFIED'
    PROCESSING = 'PROCESSING'
    APPROVED = 'APPROVED'
    REJECTED = 'REJECTED'
    ERROR = 'ERROR'

class Violation(db.Model):
    __tablename__ = 'violations'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    date_created = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    input_type = db.Column(db.String(30), nullable=False, default=TypeEnum.NONE.value)
    predicted_type = db.Column(db.String(30), nullable=False, default=TypeEnum.NONE.value)
    status = db.Column(db.String(30), nullable=False, default=StatusEnum.NONE.value)
    extra_comments = db.Column(db.String(1000), nullable=False, default='')
    resource_url = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date_created': self.date_created,
            'input_type': self.input_type,
            'predicted_type': self.predicted_type,
            'status': self.status,
            'extra_comments': self.extra_comments,
            'resource_url': self.resource_url
        }
    
    def __repr__(self):
        return f'<Violation({self.id}, {self.user_id}, {self.date_created}, {self.input_type}, {self.predicted_type}, {self.status}, {self.extra_comments}, {self.resource_url})>'

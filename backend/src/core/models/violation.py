import uuid, enum, datetime
from core.services import db

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
    created_at = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    input_type = db.Column(db.String(30), nullable=False, default=TypeEnum.NONE.value)
    predicted_type = db.Column(db.String(30), nullable=False, default=TypeEnum.NONE.value)
    status = db.Column(db.String(30), nullable=False, default=StatusEnum.NONE.value)
    resource_url = db.Column(db.String(200), nullable=False)
    
    def __repr__(self):
        return f'<Violation({self.id}, {self.user_id}, {self.created_at}, {self.input_type}, {self.predicted_type}, {self.status}, {self.resource_url})>'

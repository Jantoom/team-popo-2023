from typing import List
from src.core import db
from src.core.models import User, Violation

def get_users(data: dict) -> List[User]:
    users = db.session.scalars(db.
        select(User)).all()
    return users

def delete_violation(data: dict) -> Violation:
    violation = db.session.scalars(db.
        select(Violation).
        where(Violation.id == data['violation_id'])).first()
    if violation is not None:
        violation_copy = Violation(**violation.__dict__)
        db.session.delete(violation)
        db.session.commit()
        return violation_copy
    else:
        return None
from typing import List
from core import db
from core.models import User, Violation

def get_users(data: dict) -> List[User]:
    users = db.session.scalars(db.
        select(User)).all()
    return users

def delete_violation(data: dict) -> Violation:
    violation = db.session.scalars(db.
        select(Violation).
        where(Violation.id == data['violation_id'])).first()
    if violation is not None:
        db.session.delete(violation)
        db.session.commit()
        return violation
    else:
        return None
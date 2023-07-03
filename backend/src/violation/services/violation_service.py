import boto3, random, string, io, os
from typing import List, Tuple
from botocore.exceptions import ClientError
from core import db
from core.models import Violation

BUCKET_NAME = os.getenv('S3_BUCKET', None) # Set your S3 bucket name in code/docker-compose.env
S3 = boto3.client('s3')

def get_violations(data: dict) -> Tuple[List[Violation], int]:
    pass
    # violations = db.session.scalars(db.
    #     select(Violation).
    #     where(Violation.user_id == data['user_id'])).all()
    # total_violation_count = len(violations)
    # return violations, total_violation_count

def get_violation(data: dict) -> Violation:
    violation = db.session.scalars(db.
        select(Violation).
        where(Violation.id == data['violation_id'])).first()
    return violation

def upload_violation(data: dict) -> Violation:
    violation = Violation(
        #user_id=data['user_id'],
        resource_url=data['resource_url'],
        input_type=data['type'],
        #status=data['status'],
        extra_comments=data['extra_comments']
    )
    db.session.add(violation)
    db.session.commit()
    db.session.refresh(violation)
    return violation
    
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

###  -------------------- FIX -------------------- ###

def upload_violation_to_s3_bucket(data: dict) -> str:
    random_string = ''.join(random.choice(string.ascii_uppercase) for _ in range(10))
    key_name = f'{data["type"]}_{random_string}'
    response = S3.upload_fileobj(Fileobj=io.BytesIO(data['image']), Bucket=BUCKET_NAME, Key=key_name)
    
    return key_name

def create_presigned_url(resource_url: str) -> str:
    try:
        response = S3.generate_presigned_url('get_object',
                                                    Params={'Bucket': BUCKET_NAME,
                                                            'Key': resource_url},
                                                    ExpiresIn=133742069)
    except ClientError as e:
        #TODO handle better
        print(e)
        return ""
    return response

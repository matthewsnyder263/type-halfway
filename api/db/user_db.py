import os
from pydantic import BaseModel
from typing import List
from models import (
    User,
    # MBTI,
    # Interests,
    # UserInterests,
    # UserMBTI,
    # UserMatches,
    SessionLocal,
)


class Error(BaseModel):
    message: str


class DuplicateUserError(ValueError):
    pass


class UserDB(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    hashed_password: str
    mbti: str
    city: str
    state: str
    zip_code: str


class UserIn(BaseModel):
    username: str
    full_name: str
    email: str
    password: str
    mbti: str
    city: str
    state: str
    zip_code: str


class UserOut(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    password: str
    mbti: str
    city: str
    state: str
    zip_code: str


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def __init__(self, db: SessionLocal):
        self.db = db

    def get_user_by_email(self, email: str) -> UserDB:
        user = self.db.query(User).filter(User.email == email).first()
        if user is None:
            return None
        return UserDB(**user.__dict__)

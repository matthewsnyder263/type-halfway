from pydantic import BaseModel
from typing import List
from models import User
from .deps import get_db
from sqlalchemy.orm import Session
from fastapi import Depends


class Error(BaseModel):
    message: str


class DuplicateUserError(ValueError):
    pass


class UserDB(BaseModel):
    id: int
    username: str
    fullname: str
    email: str
    hashed_password: str
    mbti: str
    city: str
    state: str
    zip_code: str


class UserIn(BaseModel):
    username: str
    fullname: str
    email: str
    password: str
    mbti: str
    city: str
    state: str
    zip_code: str


class UserOut(BaseModel):
    id: int
    username: str
    fullname: str
    email: str
    password: str
    mbti: str
    city: str
    state: str
    zip_code: str


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def get_user_by_email(self, email: str) -> UserDB:
        user = self.db.query(User).filter(User.email == email).first()
        if user is None:
            return None
        return UserDB(**user.__dict__)

    def get_users(
        self,
    ) -> UsersOut:
        users = self.db.query(User).all()
        return UsersOut(users=[UserOut(**user.__dict__) for user in users])

    def get_user_by_id(self, user_id: int) -> UserOut:
        user = self.db.query(User).filter(User.id == user_id).first()
        if user is None:
            return None
        return UserOut(**user.__dict__)

    def create_user(self, info: UserIn, hashed_password: str):
        new_user = User(**info.dict(), hashed_password=hashed_password)
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return UserOut(**new_user.__dict__)

    def delete_user(self, user_id: int):
        user = self.db.query(User).filter(User.id == user_id).first()
        if user is None:
            return None
        self.db.delete(user)
        self.db.commit()
        return True

    def update_user(self, user_id, data):
        user = self.db.query(User).filter(User.id == user_id).first()
        if user is None:
            return None
        for key, value in data.items():
            setattr(user, key, value)
        self.db.commit()
        self.db.refresh(user)
        return UserOut(**user.__dict__)

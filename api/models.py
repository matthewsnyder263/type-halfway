from pydantic import BaseModel
from typing import List


class DuplicateUserError(ValueError):
    pass


class User(BaseModel):
    id: int
    username: str
    email: str
    hashed_password: str
    full_name: str
    mbti: str


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    mbti: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    mbti: str


# class UserOutWithPassword(UserOut):
#     hashed_password: str


class UsersOut(BaseModel):
    users: List[UserOut]

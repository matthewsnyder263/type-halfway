from pydantic import BaseModel
from typing import List


class DuplicateUserError(ValueError):
    pass


class UserIn(BaseModel):
    id: int
    username: str
    email: str
    hashed_password: str
    full_name: str
    mbti: str


class UserOut(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    mbti: str


class UsersOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    mbti: str

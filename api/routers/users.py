from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from datetime import date
from passlib.context import CryptContext
from db import UserQueries
from models import UserIn, UserOut, UsersOut

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.get("/api/users", response_model=UsersOut)
def users_list(queries: UserQueries = Depends()):
    return {
        "users": queries.get_all_users(),
    }


@router.get("/api/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.get_user(user_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.post("/api/users/", response_model=UserOut)
def create_user(user_in: UserIn, queries: UserQueries = Depends()):
    hashed_password = pwd_context.hash(user_in.password)
    user_in.password = hashed_password
    created_user = queries.create_user(user_in)

    return created_user


@router.put("/api/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_in: UserIn,
    response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.update_user(user_id, user_in)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(user_id: int, queries: UserQueries = Depends()):
    queries.delete_user(user_id)
    return True

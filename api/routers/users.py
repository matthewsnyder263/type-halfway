from fastapi import FastAPI, Depends, Response, APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class Queries:
    pass


class UserIn(BaseModel):
    first: str
    last: str
    mbti: str
    email: str
    username: str


class UserOut(BaseModel):
    id: int
    first: str
    last: str
    mbti: str
    email: str
    username: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries(Queries):
    # region properties

    def get(self, email: str) -> UserOutWithPassword:
        pass

    def create(
        self, info: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        pass


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


@router.post("api/users/", response_model=UserOut)
def create_user(user_in: UserIn, queries: UserQueries = Depends()):
    return queries.create_user(user_in)


@router.put("/api/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_in: UserIn,
    # why are we adding user_in here?
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

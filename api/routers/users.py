from fastapi import FastAPI, Depends, Response, APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/api/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    response: Response,
    queries: UserQueries = Depends(),
):
    user = queries.get_user(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    queries.delete_user(user_id)
    return True


# @router.get("/api/users", response_model=UserOut)
# def get_user(queries: UserQueries = Depends()):
#     return {
#         "users": queries.get_user(),
#     }


# @router.get("/api/users/{user_id}", response_model=UserOut)
# def get_user_by_id(
#     user_id: int,
#     queries: UserQueries = Depends(),
# ):
#     user = queries.get_user(user_id)
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="User not found",
#         )
#     return user


@router.get("/api/users", response_model=UsersOut)
def get_users(queries: UserQueries = Depends()):
    users = queries.get_users()
    return {"users": users}


@router.get("/api/users/{user_id}", response_model=UserOut)
def get_user_by_id(
    user_id: int,
    queries: UserQueries = Depends(),
):
    user = queries.get_user_by_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user


@router.put("/api/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_in: UserIn,
    response: Response,
    queries: UserQueries = Depends(),
):
    user = queries.get_user(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    queries.delete_user(user_id)
    return True


@router.put("/api/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_in: UserIn,
    response: Response,
    queries: UserQueries = Depends(),
):
    user = queries.get_user_by_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    updated_user = queries.update_user(user_id, user_in)
    return updated_user

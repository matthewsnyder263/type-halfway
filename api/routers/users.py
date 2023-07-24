# router.py
from fastapi import (
    Body,
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
    logger,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from db.user_db import (
    UserIn,
    UserOut,
    UsersOut,
    DuplicateUserError,
    UserQueries,
)


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


# implemented users:
# return user data


# @router.get("/token", response_model=AccountToken | None)
# async def get_token(
#     request: Request,
#     account: UserOut = Depends(authenticator.try_get_current_account_data),
#     users: UserQueries = Depends(),
# ) -> AccountToken | None:
#     if account and authenticator.cookie_name in request.cookies:
#         user = users.get_user_by_id(account.id)
#         if user is not None:
#             return {
#                 "access_token": request.cookies[authenticator.cookie_name],
#                 "type": "Bearer",
#                 "account": account,
#                 "user": user,
#             }
#     return None

# @router.post("/token", response_model=AccountToken | HttpError)
# async def login(
#     request: Request,
#     response: Response,
#     form: AccountForm = Body(...),
#     users: UserQueries = Depends(),
# ):
#     # print(await request.body)
#     print(form)
#     account = users.get(form.username)
#     if not account:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="User not found",
#         )
#     token = await authenticator.login(response, request, form, users)
#     return AccountToken(account=account, **token.dict())


# @router.get("/token", response_model=AccountToken | None)
# async def get_token(
#     request: Request,
#     account: UserOut = Depends(authenticator.try_get_current_account_data),
#     users: UserQueries = Depends(),
# ) -> AccountToken | None:
#     if account and authenticator.cookie_name in request.cookies:
#         user = users.get_user_by_id(account.id)
#         if user is not None:
#             token = await authenticator.login(
#                 response, request, AccountForm(username=user.username, password=user.password), users
#             )
#             return {
#                 "access_token": request.cookies[authenticator.cookie_name],
#                 "type": "Bearer",
#                 "account": account,
#                 "user": user,
#             }
#     return None


@router.post("/api/users", response_model=AccountToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = users.create_user(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(account=account, **token.dict())


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
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
    user = queries.get_user_by_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    updated_user = queries.update_user(user_id, user_in)
    return updated_user

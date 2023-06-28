# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.users import (
    UserIn,
    UserOut,
    UserOutWithPassword,
    # UserQueries,
    DuplicateUserError,
)

from db import UserQueries


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# @router.post("/api/users", response_model=AccountToken | HttpError)
# async def create_user(
#     info: UserIn,
#     request: Request,
#     response: Response,
#     users: UserQueries = Depends(),
# ):
#     hashed_password = authenticator.hash_password(info.password)
#     try:
#         account = users.create(info, hashed_password)
#     except DuplicateUserError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create an account with those credentials",
#         )
#     form = AccountForm(username=info.email, password=info.password)
#     token = await authenticator.login(response, request, form, users)
#     return AccountToken(account=account, **token.dict())


@router.post("/api/users", response_model=AccountToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account_data = users.create_user(info.dict(), hashed_password)
        account = UserOutWithPassword(**account_data)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(account=account, **token.dict())

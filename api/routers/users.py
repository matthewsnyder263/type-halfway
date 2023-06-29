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

from models import (
    UserIn,
    UserOut,
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
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(account=account, **token.dict())


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: str,
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

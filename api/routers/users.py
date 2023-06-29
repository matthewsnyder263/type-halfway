from fastapi import (  # type:ignore
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token  # type:ignore
from authenticator import authenticator  # type:ignore

from pydantic import BaseModel  # type:ignore
from typing import List
from db.users import (  # type:ignore
    # UserDB,
    UserIn,
    UserOut,
    UserQueries,
    DuplicateAccountError,
)


class UserForm(BaseModel):
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
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    # user_db = UserDB(**info.dict(), hashed_password=hashed_password)
    try:
        user = users.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an user with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(user=user, **token.dict())


@router.get("/api/users", response_model=List[UserOut])
def users_list(queries: UserQueries = Depends()):
    return queries.get_all()


@router.get("/api/users/{user_id}", response_model=UserOut)
def get(
    user_id: int,
    response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.get_user(user_id)
    if record is None:
        response.status_code = 404
    else:
        return record


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

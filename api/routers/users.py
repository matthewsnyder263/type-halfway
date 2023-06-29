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

from db.users import (  # type:ignore
    UserDB,
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


@router.post("/api/user", response_model=AccountToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    user_db = UserDB(**info.dict(), hashed_password=hashed_password)
    try:
        user = users.create(user_db)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an user with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(user=user, **token.dict())


# class Queries:
#     pass


# class UserIn(BaseModel):
#     first: str
#     last: str
#     mbti: str
#     email: str
#     username: str


# class UserOut(BaseModel):
#     id: int
#     first: str
#     last: str
#     mbti: str
#     email: str
#     username: str


# class UserOutWithPassword(UserOut):
#     hashed_password: str


# class UsersOut(BaseModel):
#     users: List[UserOut]


# class UserQueries(Queries):
#     # region properties
#     # properties of the class go here
#     # endregion

#     def get(self, email: str) -> UserOutWithPassword:
#         for user in self.users:
#             if user.email == email:
#                 return user
#         return None

#     def create(
#         self, info: UserIn, hashed_password: str
#     ) -> UserOutWithPassword:
#         pass


# @router.get("/api/users", response_model=UsersOut)
# def users_list(queries: UserQueries = Depends()):
#     return {
#         "users": queries.get_all_users(),
#     }


# @router.get("/api/users/{user_id}", response_model=UserOut)
# def get_user(
#     user_id: int,
#     response: Response,
#     queries: UserQueries = Depends(),
# ):
#     record = queries.get_user(user_id)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record


# @router.post("/api/users/", response_model=UserOut)
# def create_user(
#     user_in: UserIn,
#     queries: UserQueries = Depends(authenticator.get_current_account_data),
# ):
#     return queries.create_user(user_in)


# @router.put("/api/users/{user_id}", response_model=UserOut)
# def update_user(
#     user_id: int,
#     user_in: UserIn,
#     # why are we adding user_in here?
#     response: Response,
#     queries: UserQueries = Depends(),
# ):
#     record = queries.update_user(user_id, user_in)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record


# @router.delete("/api/users/{user_id}", response_model=bool)
# def delete_user(user_id: int, queries: UserQueries = Depends()):
#     queries.delete_user(user_id)
#     return True

from pydantic import BaseModel  # type: ignore
from typing import List, Union

# from typing import Optional

# from datetime import date
from db.pool import pool

# from .client import Queries


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class UserDB(BaseModel):
    id: int
    full_name: str
    mbti: str
    email: str
    hashed_password: str
    username: str


class UserIn(BaseModel):
    full_name: str
    mbti: str
    password: str
    email: str
    username: str


class UserOut(BaseModel):
    id: int
    full_name: str
    mbti: str
    email: str
    username: str


class UserQueries(BaseModel):
    def delete_user(self, user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s
                    """,
                    [user_id],
                )

    def get_user(self, user_id: int) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, full_name, mbti, hashed_password,
                    email, username
                    FROM users
                    WHERE email = %s
                    """,
                    [user_id],
                )
                record = None
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for value, key in enumerate(result.description):
                        record[key.name] = row[value]
                        return record
                else:
                    raise ValueError(
                        f"User not found with this email: {user_id}"
                    )

    def update_user(self, user_id: int, user: UserDB) -> Union[Error, UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET full_name = %s
                            , mbti = %s
                            , email = %s
                            , password = %s
                            , username = %s
                        WHERE id = %s
                        """,
                        (
                            user.full_name,
                            user.mbti,
                            user.email,
                            user.hashed_password,
                            user.username,
                            user_id,
                        ),
                    )
                    return self.user_in_to_out(user_id, user)
        except Exception:
            return {"Message": "Could not update user"}

    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, full_name, mbti, email, username
                        FROM users
                        """
                    )
                    return [
                        UserOut(
                            id=record[0],
                            full_name=record[1],
                            mbti=record[2],
                            email=record[3],
                            username=record[4],
                        )
                        for record in db
                    ]
        except Exception:
            return {"Message": "Could not get all users"}

    def create(self, user: UserIn, hashed_password: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO users
                            (full_name, mbti, email, password, username)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user.full_name,
                            user.mbti,
                            user.email,
                            hashed_password,
                            user.username,
                        ],
                    )
                    id = db.fetchone()[0]
                    return UserDB(
                        id=id,
                        username=user.username,
                        email=user.email,
                        hashed_password=hashed_password,
                        full_name=user.full_name,
                        mbti=user.mbti,
                    )

        except Exception:
            return {"Message": "Could not create new user"}

    # def user_in_to_out(self, id: int, user: UserIn):
    #     old_data = user.dict()
    #     return UserOut(id=id, **old_data)

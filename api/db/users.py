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
    username: str
    email: str
    hashed_password: str
    full_name: str
    mbti: str


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
    def get_user(self, email):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, full_name, mbti, email, username
                    FROM users
                    WHERE email = %s
                    """,
                    [email],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for value, key in enumerate(db.description):
                        record[key.name] = row[value]
                        return record
                    else:
                        raise ValueError(
                            f"User not found with this email: {email}"
                        )

    def update(self, user_id: int, user: UserIn) -> Union[Error, UserOut]:
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
                            user.password,
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
                            mbti=record[3],
                            email=record[4],
                            username=record[5],
                        )
                        for record in db
                    ]
        except Exception:
            return {"Message": "Could not get all users"}

    def create(self, user: UserDB) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO users
                            (full_name, mbti, email, hashed_password, username)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user.full_name,
                            user.mbti,
                            user.email,
                            user.hashed_password,
                            user.username,
                        ],
                    )
                    id = db.fetchone()[0]
                    return self.user_in_to_out(id, user)
        except Exception:
            return {"Message": "Could not create new user"}

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)

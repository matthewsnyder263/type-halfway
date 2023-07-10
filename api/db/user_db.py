import os
from psycopg_pool import ConnectionPool

from typing import List
from typing import ByteString
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class DuplicateUserError(ValueError):
    pass


class User(BaseModel):
    id: int
    username: str
    email: str
    hashed_password: str
    full_name: str
    mbti: str
    age: int
    bio: str
    interest: str
    picture: str


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    mbti: str
    age: int
    bio: str
    interest: str
    picture: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    mbti: str
    age: int
    bio: str
    interest: str
    picture: str
    hashed_password: bytes


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def get(self, email: str) -> User:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , username
                        , email
                        , hashed_password
                        , full_name
                        , mbti
                        , age
                        , bio
                        , interest
                        , picture
                    FROM users
                    WHERE email = %s;
                    """,
                    [email],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return User(
                    id=record[0],
                    username=record[1],
                    email=record[2],
                    hashed_password=record[3],
                    full_name=record[4],
                    mbti=record[5],
                    age=record[6],
                    bio=record[7],
                    interest=record[8],
                    picture=record[9],
                )

    def get_users(self) -> UsersOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , username
                        , email
                        , hashed_password
                        , full_name
                        , mbti
                        , age
                        , bio
                        , interest
                        , picture
                    FROM users;
                    """
                )
                records = db.fetchall()
                users = [
                    UserOut(
                        id=record[0],
                        username=record[1],
                        email=record[2],
                        hashed_password=record[3],
                        full_name=record[4],
                        mbti=record[5],
                        age=record[6],
                        bio=record[7],
                        interest=record[8],
                        picture=record[9],
                    )
                    for record in records
                ]
                return users

    def get_user_by_id(self, user_id: int) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , username
                        , email
                        , hashed_password
                        , full_name
                        , mbti
                        , age
                        , bio
                        , interest
                        , picture
                    FROM users
                    WHERE id = %s;
                    """,
                    [user_id],
                )
                record = db.fetchone()
                if record is None:
                    return None

                user = UserOut(
                    id=record[0],
                    username=record[1],
                    email=record[2],
                    hashed_password=record[3],
                    full_name=record[4],
                    mbti=record[5],
                    age=record[6],
                    bio=record[7],
                    interest=record[8],
                    picture=record[9],
                )
                return user

    def create_user(self, info: UserIn, hashed_password: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users (
                        username,
                        email,
                        hashed_password,
                        full_name,
                        mbti,
                        age,
                        bio,
                        interest,
                        picture
                        )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.email,
                        hashed_password,
                        info.full_name,
                        info.mbti,
                        info.age,
                        info.bio,
                        info.interest,
                        info.picture,
                    ],
                )
                id = result.fetchone()[0]
                return User(
                    id=id,
                    username=info.username,
                    email=info.email,
                    hashed_password=hashed_password,
                    full_name=info.full_name,
                    mbti=info.mbti,
                    age=info.age,
                    bio=info.bio,
                    interest=info.interest,
                    picture=info.picture,
                )

    def delete_user(self, user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s;
                    """,
                    [user_id],
                )

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    data.email,
                    data.hashed_password,
                    data.full_name,
                    data.mbti,
                    data.age,
                    data.bio,
                    data.interest,
                    data.picture,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET username = %s
                    , email = %s
                    , hashed_password = %s
                    , full_name = %s
                    , mbti = %s
                    , age = %s
                    , bio = %s
                    , interest = %s
                    , picture = %s
                    WHERE id = %s
                    RETURNING id, username, email, hashed_password, full_name, mbti, age, bio, interest, picture
                    """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

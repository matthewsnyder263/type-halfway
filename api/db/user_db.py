import os
from psycopg_pool import ConnectionPool
from typing import List, Optional
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
    gender: str
    age: int
    mbti: str
    bio: str
    city: str
    state: str
    zip_code: str
    interest: str
    picture: str


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    gender: str
    age: int
    mbti: str
    bio: str
    city: str
    state: str
    zip_code: str
    interest: str
    picture: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    gender: str
    age: int
    mbti: str
    bio: str
    city: str
    state: str
    zip_code: str
    interest: str
    picture: str
    hashed_password: Optional[str]


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def get(self, username: str) -> User:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , username
                        , email
                        , hashed_password
                        , full_name
                        , gender
                        , age
                        , mbti
                        , bio
                        , city
                        , state
                        , zip_code
                        , interest
                        , picture
                    FROM users
                    WHERE username = %s;
                    """,
                    [username],
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
                    gender=record[5],
                    age=record[6],
                    mbti=record[7],
                    bio=record[8],
                    city=record[9],
                    state=record[10],
                    zip_code=record[11],
                    interest=record[12],
                    picture=record[13],
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
                        , gender
                        , age
                        , mbti
                        , bio
                        , city
                        , state
                        , zip_code
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
                        gender=record[5],
                        age=record[6],
                        mbti=record[7],
                        bio=record[8],
                        city=record[9],
                        state=record[10],
                        zip_code=record[11],
                        interest=record[12],
                        picture=record[13],
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
                        , gender
                        , age
                        , mbti
                        , bio
                        , city
                        , state
                        , zip_code
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
                    gender=record[5],
                    age=record[6],
                    mbti=record[7],
                    bio=record[8],
                    city=record[9],
                    state=record[10],
                    zip_code=record[11],
                    interest=record[12],
                    picture=record[13],
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
                        gender,
                        age,
                        mbti,
                        bio,
                        city,
                        state,
                        zip_code,
                        interest,
                        picture
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.email,
                        hashed_password,
                        info.full_name,
                        info.gender,
                        info.age,
                        info.mbti,
                        info.bio,
                        info.city,
                        info.state,
                        info.zip_code,
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
                    gender=info.gender,
                    age=info.age,
                    mbti=info.mbti,
                    bio=info.bio,
                    city=info.city,
                    state=info.state,
                    zip_code=info.zip_code,
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
                    data.full_name,
                    data.gender,
                    data.age,
                    data.mbti,
                    data.bio,
                    data.city,
                    data.state,
                    data.zip_code,
                    data.interest,
                    data.picture,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET username = %s
                    , email = %s
                    , full_name = %s
                    , gender = %s
                    , age = %s
                    , mbti = %s
                    , bio = %s
                    , city = %s
                    , state = %s
                    , zip_code = %s
                    , interest = %s
                    , picture = %s
                    WHERE id = %s
                    RETURNING id, username, email, full_name,
                    gender, age, mbti, bio, zip_code, interest, picture
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

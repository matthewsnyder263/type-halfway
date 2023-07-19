import os
from psycopg_pool import ConnectionPool
from typing import List

# from typing import ByteString
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class DuplicateUserError(ValueError):
    pass


class UserDB(BaseModel):
    id: int
    username: str
    email: str
    hashed_password: str
    full_name: str
    gender: int
    age: int
    mbti: str
    bio: str
    zip_code: str
    interest: str
    picture: str


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    gender: int
    age: int
    mbti: str
    bio: str
    zip_code: str
    interest: str
    picture: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    # password: str
    full_name: str
    gender: int
    age: int
    mbti: str
    bio: str
    zip_code: str
    interest: str
    picture: str


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def get(self, username: str) -> UserDB:
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
                return UserDB(
                    id=record[0],
                    username=record[1],
                    email=record[2],
                    hashed_password=record[3],
                    full_name=record[4],
                    gender=record[5],
                    age=record[6],
                    mbti=record[7],
                    bio=record[8],
                    zip_code=record[9],
                    interest=record[10],
                    picture=record[11],
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
                        # hashed_password=record[3],
                        full_name=record[4],
                        gender=record[5],
                        age=record[6],
                        mbti=record[7],
                        bio=record[8],
                        zip_code=record[9],
                        interest=record[10],
                        picture=record[11],
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
                    # hashed_password=record[3],
                    full_name=record[4],
                    gender=record[5],
                    age=record[6],
                    mbti=record[7],
                    bio=record[8],
                    zip_code=record[9],
                    interest=record[10],
                    picture=record[11],
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
                        zip_code,
                        interest,
                        picture
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        info.zip_code,
                        info.interest,
                        info.picture,
                    ],
                )
                id = result.fetchone()[0]
                return UserDB(
                    id=id,
                    username=info.username,
                    email=info.email,
                    hashed_password=hashed_password,
                    full_name=info.full_name,
                    gender=info.gender,
                    age=info.age,
                    mbti=info.mbti,
                    bio=info.bio,
                    zip_code=info.zip_code,
                    interest=info.interest,
                    picture=info.picture,
                )

    def delete_user(self, user_id: int):
        user = self.db.query(UserDB).filter(UserDB.id == user_id).first()
        if user is None:
            return None
        self.db.delete(user)
        self.db.commit()
        return True

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    data.email,
                    data.hashed_password,
                    data.full_name,
                    data.gender,
                    data.age,
                    data.mbti,
                    data.bio,
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
                    , hashed_password = %s
                    , full_name = %s
                    , gender = %s
                    , age = %s
                    , mbti = %s
                    , bio = %s
                    , zip_code = %s
                    , interest = %s
                    , picture = %s
                    WHERE id = %s
                    RETURNING id, username, email, hashed_password,
                    full_name, gender, age, mbti, bio, zip_code,
                    interest, picture, interests;
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

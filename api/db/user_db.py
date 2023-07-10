import os
from psycopg_pool import ConnectionPool

# from models import User, UserIn
from pydantic import BaseModel
from typing import List

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class DuplicateUserError(ValueError):
    pass


class User(BaseModel):
    id: int
    username: str
    full_name: str
    mbti_id: int
    email: str
    hashed_password: str
    city: str
    state: str


class UserIn(BaseModel):
    username: str
    full_name: str
    mbti_id: int
    email: str
    password: str
    city: str
    state: str


class UserOut(BaseModel):
    id: int
    username: str
    full_name: str
    mbti_id: int
    email: str
    city: str
    state: str


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def get(self, username: int) -> User:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , username
                        , full_name
                        , mbti_id
                        , email
                        , hashed_password
                        , city
                        , state
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
                    full_name=record[2],
                    mbti_id=record[3],
                    email=record[4],
                    hashed_password=record[5],
                    city=record[6],
                    state=record[7],
                )

    # def get_user(self):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 """
    #                 SELECT id, full_name, mbti, email
    #                 FROM users
    #             """
    #             )
    #             results = []
    #             for row in cur.fetchall():
    #                 record = {}
    #                 for i, column in enumerate(cur.description):
    #                     record[column.name] = row[i]
    #                 results.append(record)
    #             return results

    # def get_user(self, user_id: int) -> UserOut:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 SELECT id, username, full_name, mbti, email
    #                 FROM users
    #                 WHERE id = %s;
    #                 """,
    #                 [user_id],
    #             )
    #             record = db.fetchone()
    #             if record is None:
    #                 return None

    #             user = UserOut(
    #                 id=record[0],
    #                 username=record[1],
    #                 email=record[3],
    #                 full_name=record[2],
    #                 mbti=record[4],
    #             )
    #             return user

    def get_users(self) -> UsersOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , username
                        , full_name
                        , mbti_id
                        , email
                        , hashed_password
                        , city
                        , state
                    FROM users;
                    """
                )
                records = db.fetchall()
                users = [
                    UserOut(
                        id=record[0],
                        username=record[1],
                        full_name=record[2],
                        mbti_id=record[3],
                        email=record[4],
                        hashed_password=record[5],
                        city=record[6],
                        state=record[7],
                    )
                    for record in records
                ]
                print(users)
                return users

    def get_user_by_id(self, user_id: int) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , username
                        , full_name
                        , mbti_id
                        , email
                        , hashed_password
                        , city
                        , state
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
                    full_name=record[2],
                    mbti_id=record[3],
                    email=record[4],
                    hashed_password=record[5],
                    city=record[6],
                    state=record[7],
                )
                return user

    def create_user(self, info: UserIn, hashed_password: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users (
                        username
                        , full_name
                        , mbti_id
                        , email
                        , hashed_password
                        , city
                        , state
                        )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.full_name,
                        info.mbti_id,
                        info.email,
                        hashed_password,
                        info.city,
                        info.state,
                    ],
                )
                id = result.fetchone()[0]
                return User(
                    id=id,
                    username=info.username,
                    full_name=info.full_name,
                    mbti_id=info.mbti_id,
                    email=info.email,
                    hashed_password=hashed_password,
                    city=info.city,
                    state=info.state,
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

    # def get_user(self, user_id: str):
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute

    # def update_user(self, user_id, data):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             params = [
    #                 data.username,
    #                 data.email,
    #                 data.hashed_password,
    #                 data.full_name,
    #                 data.mbti,
    #                 user_id,
    #             ]
    #             cur.execute(
    #                 """
    #                 UPDATE users
    #                 SET username = %s
    #                 , email = %s
    #                 , hashed_password = %s
    #                 , full_name = %s
    #                 , mbti = %s
    #                 WHERE id = %s
    #                 RETURNING id, username, email, hashed_password, full_name, mbti
    #                 """,
    #                 params,
    #             )

    #             record = None
    #             row = cur.fetchone()
    #             if row is not None:
    #                 record = {}
    #                 for i, column in enumerate(cur.description):
    #                     record[column.name] = row[i]

    #             return record

    # def update_user(self, user_id: int, info: UserIn):
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 UPDATE users
    #                 SET username = %s,
    #                     email = %s,
    #                     hashed_password = %s,
    #                     full_name = %s,
    #                     mbti = %s
    #                 WHERE id = %s;
    #                 """,
    #                 [
    #                     info.username,
    #                     info.email,
    #                     info.password,
    #                     info.full_name,
    #                     info.mbti,
    #                     user_id,
    #                 ],
    #             )
    #             return self.get_user_by_id(user_id)

    def update_user(self, user_id: int, info: UserIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE users
                    SET username = %s,
                        full_name = %s,
                        mbti_id = %s
                        email = %s,
                        hashed_password = %s,
                        city = %s,
                        state = %s
                    WHERE id = %s;
                    """,
                    [
                        info.username,
                        info.full_name,
                        info.mbti_id,
                        info.email,
                        info.password,
                        info.city,
                        info.state,
                    ],
                )
                return self.get_user_by_id(user_id)

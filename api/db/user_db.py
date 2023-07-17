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
    gender: str
    username: str
    full_name: str
    mbti_id: int
    email: str
    hashed_password: str
    age: int
    bio: str
    interests: str
    picture: str
    zipcode: str
    # matches_id: int


class UserIn(BaseModel):
    username: str
    gender: str
    full_name: str
    email: str
    password: str
    mbti_id: int
    age: int
    bio: str
    interests: str
    picture: str
    zipcode: str
    # matches_id: int


class UserOut(BaseModel):
    id: int
    gender: str
    username: str
    full_name: str
    mbti_id: int
    email: str
    hashed_password: str
    age: int
    bio: str
    interests: List[str]
    picture: str
    zipcode: str
    # matches_id: int


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    # note i changed username to a str from int, int was working for some reason, but i believe it should be str
    def get(self, username: str) -> User:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , gender
                        , username
                        , full_name
                        , email
                        , hashed_password
                        , mbti_id
                        , age
                        , bio
                        , interests
                        , picture
                        , zipcode
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
                    gender=record[1],
                    username=record[2],
                    full_name=record[3],
                    email=record[4],
                    hashed_password=record[5],
                    mbti_id=record[6],
                    age=record[7],
                    bio=record[8],
                    interests=record[9],
                    picture=record[10],
                    zipcode=record[11],
                    # matches_id=record[12],
                )

    # def get_users(self) -> UsersOut:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 SELECT id
    #                     , gender
    #                     , username
    #                     , full_name
    #                     , email
    #                     , hashed_password
    #                     , mbti_id
    #                     , age
    #                     , bio
    #                     , picture
    #                     , zipcode
    #                     , matches_id
    #                 FROM users;
    #                 """
    #             )
    #             records = db.fetchall()
    #             users = [
    #                 UserOut(
    #                     id=record[0],
    #                     gender=record[1],
    #                     username=record[2],
    #                     full_name=record[3],
    #                     email=record[4],
    #                     hashed_password=record[5],
    #                     mbti_id=record[6],
    #                     age=record[7],
    #                     bio=record[8],
    #                     # interests=record[9],
    #                     picture=record[9],
    #                     zipcode=record[10],
    #                     matches_id=record[11],
    #                 )
    #                 for record in records
    #             ]
    #             return users

    # def get_users(self) -> UsersOut:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 SELECT id
    #                     , gender
    #                     , username
    #                     , full_name
    #                     , email
    #                     , hashed_password
    #                     , mbti_id
    #                     , age
    #                     , bio
    #                     , picture
    #                     , zipcode
    #                 FROM users;
    #                 """
    #             )
    #             records = db.fetchall()
    #             users = []
    #             for record in records:
    #                 db.execute(
    #                     """
    #                     SELECT interests.interest_name
    #                     FROM interests
    #                     JOIN user_interest ON user_interest.interest_id = interests.id
    #                     WHERE user_interest.user_id = %s;
    #                     """,
    #                     [
    #                         record[0]
    #                     ],  # Assuming that the user's id is the first field in the record
    #                 )
    #                 interests = [interest[0] for interest in db.fetchall()]
    #                 user = UserOut(
    #                     id=record[0],
    #                     gender=record[1],
    #                     username=record[2],
    #                     full_name=record[3],
    #                     hashed_password=[4],
    #                     email=record[5],
    #                     mbti_id=record[6],
    #                     age=record[7],
    #                     bio=record[8],
    #                     interests=interests,
    #                     picture=record[9],
    #                     zipcode=record[10],
    #                 )
    #                 users.append(user)
    #             return UsersOut(users=users)

    def get_users(self) -> UsersOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , gender
                        , username
                        , full_name
                        , email
                        , hashed_password
                        , mbti_id
                        , age
                        , bio
                        , interests
                        , picture
                        , zipcode
                    FROM users;
                    """
                )
                records = db.fetchall()
                users = [
                    UserOut(
                        id=record[0],
                        gender=record[1],
                        username=record[2],
                        full_name=record[3],
                        email=record[4],
                        hashed_password=record[5],
                        mbti_id=record[6],
                        age=record[7],
                        bio=record[8],
                        interests=record[10].split(","),
                        picture=record[11],
                        zipcode=record[12],
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
                        , gender
                        , username
                        , full_name
                        , email
                        , hashed_password
                        , mbti_id
                        , age
                        , bio
                        , interests
                        , picture
                        , zipcode
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
                    gender=record[1],
                    username=record[2],
                    full_name=record[3],
                    email=record[4],
                    hashed_password=record[5],
                    mbti_id=record[6],
                    age=record[7],
                    bio=record[8],
                    interests=record[9],
                    picture=record[10],
                    zipcode=record[11],
                )
                return user

    def create_user(self, info: UserIn, hashed_password: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users (
                        gender
                        , username
                        , full_name
                        , email
                        , hashed_password
                        , mbti_id
                        , age
                        , bio
                        , interests
                        , picture
                        , zipcode
                        )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.gender,
                        info.username,
                        info.full_name,
                        info.email,
                        hashed_password,
                        info.mbti_id,
                        info.age,
                        info.bio,
                        info.interests,
                        info.picture,
                        info.zipcode,
                        # info.matches_id,
                    ],
                )
                # id = result.fetchone()[0]

                # interest_ids = (
                #     info.interests
                # )  # assuming interests is now a list of interest ids
                # for interest_id in interest_ids:
                #     db.execute(
                #         """
                #         INSERT INTO user_interest (user_id, interest_id)
                #         VALUES (%s, %s);
                #         """,
                #         [id, interest_id],
                #     )

                return User(
                    id=id,
                    gender=info.gender,
                    username=info.username,
                    full_name=info.full_name,
                    email=info.email,
                    hashed_password=hashed_password,
                    mbti_id=info.mbti_id,
                    age=info.age,
                    bio=info.bio,
                    interest=info.interests,
                    picture=info.picture,
                    zipcode=info.zipcode,
                    # matches_id=info.matches_id,
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
                record = db.fetchone()
                if record is None:
                    return False
        return True

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.gender,
                    data.username,
                    data.full_name,
                    data.email,
                    data.hashed_password,
                    data.mbti_id,
                    data.age,
                    data.bio,
                    data.interests,
                    data.picture,
                    data.zipcode,
                    data.matches_id,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET gender = %s
                        , username = %s
                        , full_name = %s
                        , email = %s
                        , hashed_password = %s
                        , mbti_id = %s
                        , age = %s
                        , bio = %s
                        , interests = %s
                        , picture = %s
                        , zipcode = %s
                    WHERE id = %s
                    RETURNING id
                        , username
                        , full_name
                        , email
                        , hashed_password
                        , mbti_id
                        , age
                        , bio
                        , interests
                        , picture
                        , zipcode
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


# import os
# from psycopg_pool import ConnectionPool

# # from models import User, UserIn
# from pydantic import BaseModel
# from typing import List

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


# class DuplicateUserError(ValueError):
#     pass


# class User(BaseModel):
#     id: int
#     username: str
#     full_name: str
#     mbti_id_id: int
#     email: str
#     hashed_password: str
#     city: str
#     state: str


# class UserIn(BaseModel):
#     username: str
#     full_name: str
#     mbti_id_id: int
#     email: str
#     password: str
#     city: str
#     state: str


# class UserOut(BaseModel):
#     id: int
#     username: str
#     full_name: str
#     mbti_id_id: int
#     email: str
#     city: str
#     state: str


# class UsersOut(BaseModel):
#     users: List[UserOut]


# class UserQueries:
#     def get(self, username: int) -> User:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     SELECT id
#                         , username
#                         , full_name
#                         , mbti_id_id
#                         , email
#                         , hashed_password
#                         , city
#                         , state
#                     FROM users
#                     WHERE username = %s;
#                     """,
#                     [username],
#                 )
#                 record = result.fetchone()
#                 if record is None:
#                     return None
#                 return User(
#                     id=record[0],
#                     username=record[1],
#                     full_name=record[2],
#                     mbti_id_id=record[3],
#                     email=record[4],
#                     hashed_password=record[5],
#                     city=record[6],
#                     state=record[7],
#                 )


#     def get_users(self) -> UsersOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT id
#                         , username
#                         , full_name
#                         , mbti_id_id
#                         , email
#                         , hashed_password
#                         , city
#                         , state
#                     FROM users;
#                     """
#                 )
#                 records = db.fetchall()
#                 users = [
#                     UserOut(
#                         id=record[0],
#                         username=record[1],
#                         full_name=record[2],
#                         mbti_id_id=record[3],
#                         email=record[4],
#                         hashed_password=record[5],
#                         city=record[6],
#                         state=record[7],
#                     )
#                     for record in records
#                 ]
#                 print(users)
#                 return users

#     def get_user_by_id(self, user_id: int) -> UserOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT id
#                         , username
#                         , full_name
#                         , mbti_id_id
#                         , email
#                         , hashed_password
#                         , city
#                         , state
#                     FROM users
#                     WHERE id = %s;
#                     """,
#                     [user_id],
#                 )
#                 record = db.fetchone()
#                 if record is None:
#                     return None

#                 user = UserOut(
#                     id=record[0],
#                     username=record[1],
#                     full_name=record[2],
#                     mbti_id_id=record[3],
#                     email=record[4],
#                     hashed_password=record[5],
#                     city=record[6],
#                     state=record[7],
#                 )
#                 return user

#     def create_user(self, info: UserIn, hashed_password: str):
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO users (
#                         username
#                         , full_name
#                         , mbti_id_id
#                         , email
#                         , hashed_password
#                         , city
#                         , state
#                         )
#                     VALUES (%s, %s, %s, %s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [
#                         info.username,
#                         info.full_name,
#                         info.mbti_id_id,
#                         info.email,
#                         hashed_password,
#                         info.city,
#                         info.state,
#                     ],
#                 )
#                 id = result.fetchone()[0]
#                 return User(
#                     id=id,
#                     username=info.username,
#                     full_name=info.full_name,
#                     mbti_id_id=info.mbti_id_id,
#                     email=info.email,
#                     hashed_password=hashed_password,
#                     city=info.city,
#                     state=info.state,
#                 )

#     def delete_user(self, user_id: int):
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     DELETE FROM users
#                     WHERE id = %s;
#                     """,
#                     [user_id],
#                 )

#     def update_user(self, user_id: int, info: UserIn):
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     UPDATE users
#                     SET username = %s,
#                         full_name = %s,
#                         mbti_id_id = %s
#                         email = %s,
#                         hashed_password = %s,
#                         city = %s,
#                         state = %s
#                     WHERE id = %s;
#                     """,
#                     [
#                         info.username,
#                         info.full_name,
#                         info.mbti_id_id,
#                         info.email,
#                         info.password,
#                         info.city,
#                         info.state,
#                     ],
#                 )
#                 return self.get_user_by_id(user_id)

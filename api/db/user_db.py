import os
from psycopg_pool import ConnectionPool

from typing import List, Optional
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
    bio: Optional[str]
    interests: List[int]  # changed from str to List[int]
    picture: Optional[str]
    zipcode: Optional[str]


class UserIn(BaseModel):
    gender: str
    username: str
    full_name: str
    email: str
    password: str
    mbti_id: int
    age: int
    bio: Optional[str]
    interests: List[int]  # changed from str to List[int]
    picture: Optional[str]
    zipcode: Optional[str]


class UserOut(BaseModel):
    id: int
    gender: str
    username: str
    full_name: str
    mbti_id: int
    email: str
    hashed_password: str
    age: int
    bio: Optional[str]
    interests: List[str]  # changed from str to List[int]
    picture: Optional[str]
    zipcode: Optional[str]


class UsersOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def get(self, username: str) -> User:
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
                        , picture
                        , zipcode
                    FROM users
                    WHERE username = %s;
                    """,
                    [username],
                )
                record = db.fetchone()
                if record is None:
                    return None

                db.execute(
                    """
                    SELECT interest_id
                    FROM user_interest
                    WHERE user_id = %s;
                    """,
                    [record[0]],
                )
                interests = [interest[0] for interest in db.fetchall()]

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
                    interests=interests,
                    picture=record[9],
                    zipcode=record[10],
                )

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
                        , picture
                        , zipcode
                    FROM users;
                    """
                )
                records = db.fetchall()
                users = []
                for record in records:
                    db.execute(
                        """
                        SELECT interests.interest_name
                        FROM interests
                        JOIN user_interest ON user_interest.interest_id = interests.id
                        WHERE user_interest.user_id = %s;
                        """,
                        [
                            record[0]
                        ],  # Assuming that the user's id is the first field in the record
                    )
                    interests = [interest[0] for interest in db.fetchall()]
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
                        interests=interests,
                        picture=record[9],
                        zipcode=record[10],
                    )
                    users.append(user)
                    print(users)
                return UsersOut(users=users)

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

                db.execute(
                    """
                    SELECT interests.interest_name
                    FROM interests
                    JOIN user_interest ON user_interest.interest_id = interests.id
                    WHERE user_interest.user_id = %s;
                    """,
                    [record[0]],
                )
                interests = [interest[0] for interest in db.fetchall()]

                return UserOut(
                    id=record[0],
                    gender=record[1],
                    username=record[2],
                    full_name=record[3],
                    email=record[4],
                    hashed_password=record[5],
                    mbti_id=record[6],
                    age=record[7],
                    bio=record[8],
                    interests=interests,
                    picture=record[9],
                    zipcode=record[10],
                )

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
                        , picture
                        , zipcode
                        )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        info.picture,
                        info.zipcode,
                    ],
                )
                id = result.fetchone()[0]

                interest_ids = (
                    info.interests
                )  # assuming interests is now a list of interest ids
                for interest_id in interest_ids:
                    db.execute(
                        """
                        INSERT INTO user_interest (user_id, interest_id)
                        VALUES (%s, %s);
                        """,
                        [id, interest_id],
                    )

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
                    interests=interest_ids,
                    picture=info.picture,
                    zipcode=info.zipcode,
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
                return db.rowcount > 0

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
                    data.picture,
                    data.zipcode,
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
                        , picture = %s
                        , zipcode = %s
                    WHERE id = %s
                    RETURNING id
                        , gender
                        , username
                        , full_name
                        , email
                        , hashed_password
                        , mbti_id
                        , age
                        , bio
                        , picture
                        , zipcode
                    """,
                    params,
                )
                record = cur.fetchone()
                if record is None:
                    return None

                # Update interests
                cur.execute(
                    """
                    DELETE FROM user_interest
                    WHERE user_id = %s;
                    """,
                    [user_id],
                )

                for interest_id in data.interests:
                    cur.execute(
                        """
                        INSERT INTO user_interest (user_id, interest_id)
                        VALUES (%s, %s);
                        """,
                        [user_id, interest_id],
                    )

                cur.execute(
                    """
                    SELECT interests.interest_name
                    FROM interests
                    JOIN user_interest ON user_interest.interest_id = interests.id
                    WHERE user_interest.user_id = %s;
                    """,
                    [record[0]],
                )
                interests = [interest[0] for interest in cur.fetchall()]

                return UserOut(
                    id=record[0],
                    gender=record[1],
                    username=record[2],
                    full_name=record[3],
                    email=record[4],
                    hashed_password=record[5],
                    mbti_id=record[6],
                    age=record[7],
                    bio=record[8],
                    interests=interests,
                    picture=record[9],
                    zipcode=record[10],
                )


# import os
# from psycopg_pool import ConnectionPool

# from typing import List
# from typing import ByteString
# from pydantic import BaseModel

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


# class DuplicateUserError(ValueError):
#     pass


# class User(BaseModel):
#     id: int
#     gender: str
#     username: str
#     full_name: str
#     mbti_id: int
#     email: str
#     hashed_password: str
#     age: int
#     bio: str
#     interests: str
#     picture: str
#     zipcode: str
#     # matches_id: int


# class UserIn(BaseModel):
#     username: str
#     gender: str
#     full_name: str
#     email: str
#     password: str
#     mbti_id: int
#     age: int
#     bio: str
#     interests: str
#     picture: str
#     zipcode: str
#     # matches_id: int


# class UserOut(BaseModel):
#     id: int
#     gender: str
#     username: str
#     full_name: str
#     mbti_id: int
#     email: str
#     hashed_password: str
#     age: int
#     bio: str
#     interests: List[str]
#     picture: str
#     zipcode: str
#     # matches_id: int


# class UsersOut(BaseModel):
#     users: List[UserOut]


# class UserQueries:
#     # note i changed username to a str from int, int was working for some reason, but i believe it should be str
#     def get(self, username: str) -> User:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     SELECT id
#                         , gender
#                         , username
#                         , full_name
#                         , email
#                         , hashed_password
#                         , mbti_id
#                         , age
#                         , bio
#                         , interests
#                         , picture
#                         , zipcode
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
#                     gender=record[1],
#                     username=record[2],
#                     full_name=record[3],
#                     email=record[4],
#                     hashed_password=record[5],
#                     mbti_id=record[6],
#                     age=record[7],
#                     bio=record[8],
#                     interests=record[9],
#                     picture=record[9],
#                     zipcode=record[10],
#                     # matches_id=record[12],
#                 )

#     # def get_users(self) -> UsersOut:
#     #     with pool.connection() as conn:
#     #         with conn.cursor() as db:
#     #             db.execute(
#     #                 """
#     #                 SELECT id
#     #                     , gender
#     #                     , username
#     #                     , full_name
#     #                     , email
#     #                     , hashed_password
#     #                     , mbti_id
#     #                     , age
#     #                     , bio
#     #                     , picture
#     #                     , zipcode
#     #                     , matches_id
#     #                 FROM users;
#     #                 """
#     #             )
#     #             records = db.fetchall()
#     #             users = [
#     #                 UserOut(
#     #                     id=record[0],
#     #                     gender=record[1],
#     #                     username=record[2],
#     #                     full_name=record[3],
#     #                     email=record[4],
#     #                     hashed_password=record[5],
#     #                     mbti_id=record[6],
#     #                     age=record[7],
#     #                     bio=record[8],
#     #                     # interests=record[9],
#     #                     picture=record[9],
#     #                     zipcode=record[10],
#     #                     matches_id=record[11],
#     #                 )
#     #                 for record in records
#     #             ]
#     #             return users

#     def get_users(self) -> UsersOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT id
#                         , gender
#                         , username
#                         , full_name
#                         , email
#                         , hashed_password
#                         , mbti_id
#                         , age
#                         , bio
#                         , picture
#                         , zipcode
#                     FROM users;
#                     """
#                 )
#                 records = db.fetchall()
#                 users = []
#                 for record in records:
#                     db.execute(
#                         """
#                         SELECT interests.interest_name
#                         FROM interests
#                         JOIN user_interest ON user_interest.interest_id = interests.id
#                         WHERE user_interest.user_id = %s;
#                         """,
#                         [
#                             record[0]
#                         ],  # Assuming that the user's id is the first field in the record
#                     )
#                     interests = [interest[0] for interest in db.fetchall()]
#                     user = UserOut(
#                         id=record[0],
#                         gender=record[1],
#                         username=record[2],
#                         full_name=record[3],
#                         hashed_password=[4],
#                         email=record[5],
#                         mbti_id=record[6],
#                         age=record[7],
#                         bio=record[8],
#                         interests=interests,
#                         picture=record[9],
#                         zipcode=record[10],
#                     )
#                     users.append(user)
#                 return UsersOut(users=users)

#     def get_user_by_id(self, user_id: int) -> UserOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT id
#                         , gender
#                         , username
#                         , full_name
#                         , email
#                         , hashed_password
#                         , mbti_id
#                         , age
#                         , bio
#                         , picture
#                         , zipcode
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
#                 )
#                 return user

#     def create_user(self, info: UserIn, hashed_password: str):
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO users (
#                         gender
#                         , username
#                         , full_name
#                         , email
#                         , hashed_password
#                         , mbti_id
#                         , age
#                         , bio
#                         , picture
#                         , zipcode
#                         )
#                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [
#                         info.gender,
#                         info.username,
#                         info.full_name,
#                         info.email,
#                         hashed_password,
#                         info.mbti_id,
#                         info.age,
#                         info.bio,
#                         # info.interests,
#                         info.picture,
#                         info.zipcode,
#                         # info.matches_id,
#                     ],
#                 )
#                 id = result.fetchone()[0]

#                 interest_ids = (
#                     info.interests
#                 )  # assuming interests is now a list of interest ids
#                 for interest_id in interest_ids:
#                     db.execute(
#                         """
#                         INSERT INTO user_interest (user_id, interest_id)
#                         VALUES (%s, %s);
#                         """,
#                         [id, interest_id],
#                     )

#                 return User(
#                     id=id,
#                     gender=info.gender,
#                     username=info.username,
#                     full_name=info.full_name,
#                     email=info.email,
#                     hashed_password=hashed_password,
#                     mbti_id=info.mbti_id,
#                     age=info.age,
#                     bio=info.bio,
#                     # interest=info.interests,
#                     picture=info.picture,
#                     zipcode=info.zipcode,
#                     # matches_id=info.matches_id,
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
#                 record = db.fetchone()
#                 if record is None:
#                     return False
#         return True

#     def update_user(self, user_id, data):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     data.gender,
#                     data.username,
#                     data.full_name,
#                     data.email,
#                     data.hashed_password,
#                     data.mbti_id,
#                     data.age,
#                     data.bio,
#                     # data.interests,
#                     data.picture,
#                     data.zipcode,
#                     data.matches_id,
#                     user_id,
#                 ]
#                 cur.execute(
#                     """
#                     UPDATE users
#                     SET gender = %s
#                         , username = %s
#                         , full_name = %s
#                         , email = %s
#                         , hashed_password = %s
#                         , mbti_id = %s
#                         , age = %s
#                         , bio = %s
#                         , picture = %s
#                         , zipcode = %s
#                     WHERE id = %s
#                     RETURNING id
#                         , username
#                         , full_name
#                         , email
#                         , hashed_password
#                         , mbti_id
#                         , age
#                         , bio
#                         , picture
#                         , zipcode
#                     """,
#                     params,
#                 )
#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]
#                 return record

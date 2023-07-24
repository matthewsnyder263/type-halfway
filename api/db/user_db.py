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
    gender: str
    username: str
    full_name: str
    mbti_id: int
    email: str
    hashed_password: str
    full_name: str
    gender: str
    age: str
    mbti: str
    bio: str
    zip_code: str
    interest: str
    picture: str
    zipcode: str
    # matches_id: int


class UserIn(BaseModel):
    username: str
    gender: str
    full_name: str
    email: str
    password: str
    full_name: str
    gender: str
    age: str
    mbti: str
    bio: str
    zip_code: str
    interest: str
    picture: str
    zipcode: str
    # matches_id: int


class UserOut(BaseModel):
    id: int
    gender: str
    username: str
    email: str
    # password: str
    full_name: str
    gender: str
    age: str
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
                        , gender
                        , username
                        , full_name
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
                        , zipcode
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
                        , full_name
                        , gender
                        , age
                        , mbti
                        , bio
                        , zip_code
                        , interest
                        , picture
                        , zipcode
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
                        , gender
                        , username
                        , full_name
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
                # Convert list of interests to a PostgreSQL array literal
                interests_str = "{" + ",".join(info.interests) + "}"
                db.execute(
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
                        info.gender,
                        info.username,
                        info.full_name,
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
                        info.zipcode,
                    ],
                )
                id = result.fetchone()[0]
                return UserDB(
                    id=id,
                    gender=info.gender,
                    username=info.username,
                    full_name=info.full_name,
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
                    zipcode=info.zipcode,
                )

    # def create_user(self, info: UserIn, hashed_password: str):
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 INSERT INTO users (
    #                     gender
    #                     , username
    #                     , full_name
    #                     , email
    #                     , hashed_password
    #                     , mbti_id
    #                     , age
    #                     , bio
    #                     , interests
    #                     , picture
    #                     , zipcode
    #                     )
    #                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    #                 RETURNING id;
    #                 """,
    #                 [
    #                     info.gender,
    #                     info.username,
    #                     info.full_name,
    #                     info.email,
    #                     hashed_password,
    #                     info.mbti_id,
    #                     info.age,
    #                     info.bio,
    #                     info.interests,
    #                     info.picture,
    #                     info.zipcode,
    #                     # info.matches_id,
    #                 ],
    #             )
    #             # id = result.fetchone()[0]

    #             # interest_ids = (
    #             #     info.interests
    #             # )  # assuming interests is now a list of interest ids
    #             # for interest_id in interest_ids:
    #             #     db.execute(
    #             #         """
    #             #         INSERT INTO user_interest (user_id, interest_id)
    #             #         VALUES (%s, %s);
    #             #         """,
    #             #         [id, interest_id],
    #             #     )

    #             return User(
    #                 id=id,
    #                 gender=info.gender,
    #                 username=info.username,
    #                 full_name=info.full_name,
    #                 email=info.email,
    #                 hashed_password=hashed_password,
    #                 mbti_id=info.mbti_id,
    #                 age=info.age,
    #                 bio=info.bio,
    #                 interests=info.interests,
    #                 picture=info.picture,
    #                 zipcode=info.zipcode,
    #                 # matches_id=info.matches_id,
    #             )

    def delete_user(self, user_id: int):
        user = self.db.query(UserDB).filter(UserDB.id == user_id).first()
        if user is None:
            return None
        self.db.delete(user)
        self.db.commit()
        return True

    def update_user(self, user_id, data, hashed_password):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.gender,
                    data.username,
                    data.full_name,
                    data.gender,
                    data.age,
                    data.mbti,
                    data.bio,
                    data.zip_code,
                    data.interest,
                    data.picture,
                    data.zipcode,
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

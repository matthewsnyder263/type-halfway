import os
from psycopg_pool import ConnectionPool
from models import User, UserIn

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


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
                )

    def get_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, full_name, mbti, email
                    FROM users
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results

    def create_user(self, info: UserIn, hashed_password: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users (username, email, hashed_password, full_name, mbti)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.email,
                        hashed_password,
                        info.full_name,
                        info.mbti,
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
                )


# import os
# from psycopg_pool import ConnectionPool

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


# class UserQueries:
#     def get_all_users(self):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT id, full_name, mbti, email
#                     FROM users
#                 """
#                 )

#                 results = []
#                 for row in cur.fetchall():
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]
#                     results.append(record)

#                 return results

#     def get(self, email: str):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT id, full_name, mbti, email, password
#                     FROM users
#                     WHERE email = %s
#                     """,
#                     [email],
#                 )

#                 row = cur.fetchone()
#                 if row is not None:
#                     return {
#                         "id": row[0],
#                         "full_name": row[1],
#                         "mbti": row[2],
#                         "email": row[3],
#                         "hashed_password": row[4],
#                     }

#     def create_user(self, data: dict, hashed_password: str):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     data["full_name"],
#                     data["mbti"],
#                     data["email"],
#                     hashed_password,
#                 ]
#                 cur.execute(
#                     """
#                     INSERT INTO users (full_name, mbti, email, password)
#                     VALUES (%s, %s, %s, %s)
#                     RETURNING id, full_name, mbti, email, password
#                     """,
#                     params,
#                 )

#                 row = cur.fetchone()
#                 if row is not None:
#                     return {
#                         "id": row[0],
#                         "full_name": row[1],
#                         "mbti": row[2],
#                         "email": row[3],
#                         "hashed_password": row[4],
#                     }

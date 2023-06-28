import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class UserQueries:
    def get_all_users(self):
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

    def get(self, email: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, full_name, mbti, email, password
                    FROM users
                    WHERE email = %s
                    """,
                    [email],
                )

                row = cur.fetchone()
                if row is not None:
                    return {
                        "id": row[0],
                        "full_name": row[1],
                        "mbti": row[2],
                        "email": row[3],
                        "hashed_password": row[4],
                    }

    def create_user(self, data: dict, hashed_password: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data["full_name"],
                    data["mbti"],
                    data["email"],
                    hashed_password,
                ]
                cur.execute(
                    """
                    INSERT INTO users (full_name, mbti, email, password)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, full_name, mbti, email, password
                    """,
                    params,
                )

                row = cur.fetchone()
                if row is not None:
                    return {
                        "id": row[0],
                        "full_name": row[1],
                        "mbti": row[2],
                        "email": row[3],
                        "hashed_password": row[4],
                    }

    # def create_user(self, data: UserIn, hashed_password: str):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             params = [
    #                 data.full_name,
    #                 data.mbti,
    #                 data.email,
    #                 hashed_password,
    #             ]
    #             cur.execute(
    #                 """
    #                 INSERT INTO users (full_name, mbti, email, password)
    #                 VALUES (%s, %s, %s, %s)
    #                 RETURNING id, full_name, mbti, email, password
    #                 """,
    #                 params,
    #             )

    #             record = None
    #             row = cur.fetchone()
    #             if row is not None:
    #                 record = UserOutWithPassword(
    #                     id=row[0],
    #                     full_name=row[1],
    #                     mbti=row[2],
    #                     email=row[3],
    #                     hashed_password=row[4],
    #                 )
    #                 return record
    # for i, column in enumerate(cur.description):
    #     record[column.name] = row[i]

    # def __init__(self, pool):
    #     self.pool = pool

    # async def get(self, email: str) -> UserOutWithPassword:
    # async with self.pool.acquire() as connection:
    #     async with connection.cursor() as cursor:
    #         await cursor.execute(
    #             """
    #             SELECT * FROM users WHERE email = %s;
    #             """,
    #             (email,),
    #         )
    #         user = await cursor.fetchone()
    #         if not user:
    #             return None
    #         return UserOutWithPassword(**user)

    # async def create(
    #     self, info: UserIn, hashed_password: str
    # ) -> UserOutWithPassword:

    # async with self.pool.acquire() as connection:
    #     async with connection.cursor() as cursor:
    #         await cursor.execute(
    #             """
    #             INSERT INTO users(full_name, mbti, email, password)
    #             VALUES(%s, %s, %s, %s) RETURNING *;
    #             """,
    #             (info.full_name, info.mbti, info.email, hashed_password),
    #         )
    #         user = await cursor.fetchone()
    #         return UserOutWithPassword(**user)

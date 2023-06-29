from psycopg_pool import ConnectionPool
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class UserQueries:
    def get_all_users(self):
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT first, last, mbti, email
                    FROM users
                    ORDER BY last, first
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {
                        "first": row[0],
                        "last": row[1],
                        "mbti": row[2],
                        "email": row[3],
                    }
                    results.append(record)

                return results

    def get_user(self, user_id):
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT first, last, mbti, email
                    FROM users
                    WHERE id = %s
                """,
                    [user_id],
                )

                row = cur.fetchone()
                if row is not None:
                    record = {
                        "first": row[0],
                        "last": row[1],
                        "mbti": row[2],
                        "email": row[3],
                    }
                    return record

    def create_user(self, data):
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                params = [
                    data.first,
                    data.last,
                    data.mbti,
                    data.email,
                    data.username,
                ]
                cur.execute(
                    """
                    INSERT INTO users (first, last, mbti, email, username)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, first, last, mbti, email, username
                    """,
                    params,
                )

                row = cur.fetchone()
                if row is not None:
                    record = {
                        "id": row[0],
                        "first": row[1],
                        "last": row[2],
                        "mbti": row[3],
                        "email": row[4],
                        "username": row[5],
                    }
                    return record

    def update_user(self, user_id, data):
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                params = [
                    data.first,
                    data.last,
                    data.mbti,
                    data.email,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET first = %s
                    , last = %s
                    , mbti = %s
                    , email = %s
                    WHERE id = %s
                    RETURNING id, first, last, mbti, email
                    """,
                    params,
                )

                row = cur.fetchone()
                if row is not None:
                    record = {
                        "id": row[0],
                        "first": row[1],
                        "last": row[2],
                        "mbti": row[3],
                        "email": row[4],
                    }
                    return record

    def delete_user(self, user_id):
        with pool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s
                    """,
                    [user_id],
                )

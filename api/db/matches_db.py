import os
from typing import List
from pydantic import BaseModel
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class MatchIn(BaseModel):
    logged_in_user: int
    user_id: int

class MatchOut(BaseModel):
    id: int
    logged_in_user: int
    user_id: int

class MatchQueries:
    def create_match(self, data: MatchIn) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO matches (logged_in_user, user_id)
                    VALUES (%s, %s)
                    RETURNING id, logged_in_user, user_id;
                    """,
                    (data.logged_in_user, data.user_id),
                )
                row = cur.fetchone()
                if row is not None:
                    return MatchOut(*row)

    def get_matches_by_user(self, user_id: int) -> List[MatchOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, logged_in_user, user_id
                    FROM matches
                    WHERE logged_in_user = %s;
                    """,
                    [user_id],
                )
                rows = cur.fetchall()
                return [MatchOut(*row) for row in rows]

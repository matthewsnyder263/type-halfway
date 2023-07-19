import os
from typing import List
from pydantic import BaseModel
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class MatchIn(BaseModel):
    logged_in_user: int
    matched_user: int

class MatchOut(BaseModel):
    id: int
    logged_in_user: int
    matched_user: int

class MatchQueries:
    def create_match(self, data: MatchIn) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO matches (logged_in_user, matched_user)
                    VALUES (%s, %s)
                    RETURNING id, logged_in_user, matched_user;
                    """,
                    (data.logged_in_user, data.matched_user),
                )
                row = cur.fetchone()
                if row is not None:
                    return MatchOut(*row)

    def get_matches_by_user(self, matched_user: int) -> List[MatchOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, logged_in_user, matched_user
                    FROM matches
                    WHERE logged_in_user = %s;
                    """,
                    [matched_user],
                )
                rows = cur.fetchall()
                return [MatchOut(*row) for row in rows]

import os
from typing import List
from pydantic import BaseModel
from psycopg_pool import ConnectionPool
from datetime import datetime

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class PotentialMatch(BaseModel):
    id: int
    logged_in_user: int
    match_id: int
    matched_user: int
    mbti_strength: int
    liked: bool
    created_on: datetime


class PotentialMatchIn(BaseModel):
    logged_in_user: int
    match_id: int
    matched_user: int
    mbti_strength: int
    liked: bool


class PotentialMatchOut(BaseModel):
    id: int
    logged_in_user: int
    match_id: int
    matched_user: int
    mbti_strength: int
    liked: bool
    created_on: datetime


class PotentialMatchQueries:
    def create_potential_match(
        self, data: PotentialMatchIn
    ) -> PotentialMatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO potential_matches (logged_in_user, match_id, user_id, mbti_strength, liked)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, logged_in_user, match_id, user_id, mbti_strength, liked, created_on;
                    """,
                    (
                        data.logged_in_user,
                        data.match_id,
                        data.matched_user,
                        data.mbti_strength,
                        data.liked,
                    ),
                )
                row = cur.fetchone()
                if row is not None:
                    return PotentialMatchOut(*row)

    def get_potential_matches_by_user(
        self, matched_user: int
    ) -> List[PotentialMatchOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, logged_in_user, match_id, matched_user, mbti_strength, liked, created_on
                    FROM potential_matches
                    WHERE logged_in_user = %s;
                    """,
                    [matched_user],
                )
                rows = cur.fetchall()
                return [PotentialMatchOut(*row) for row in rows]

    def update_potential_match(
        self, match_id: int, liked: bool
    ) -> PotentialMatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE potential_matches
                    SET liked = %s
                    WHERE id = %s
                    RETURNING id, logged_in_user, match_id, matched_user, mbti_strength, liked, created_on;
                    """,
                    (liked, match_id),
                )
                row = cur.fetchone()
                if row is not None:
                    return PotentialMatchOut(*row)

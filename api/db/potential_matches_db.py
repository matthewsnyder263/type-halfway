import os
from typing import List, Optional
from pydantic import BaseModel
from psycopg_pool import ConnectionPool
from datetime import datetime

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class PotentialMatch(BaseModel):
    id: int
    logged_in_user: int
    match_id: Optional[int] = None
    matched_user: int
    mbti_strength: int
    liked: bool
    created_on: datetime


class PotentialMatchIn(BaseModel):
    logged_in_user: int
    matched_user: int
    mbti_strength: int
    liked: bool


class PotentialMatchOut(BaseModel):
    id: int
    logged_in_user: int
    match_id: Optional[int] = None
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
                result = cur.execute(
                    """
                    INSERT INTO potential_matches (logged_in_user, matched_user, mbti_strength, liked)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, logged_in_user, match_id, matched_user, mbti_strength, liked, created_on;
                    """,
                    (
                        data.logged_in_user,
                        data.matched_user,
                        data.mbti_strength,
                        data.liked,
                    ),
                )
                row = result.fetchone()
                if row is None:
                    return None

                potentialMatch = PotentialMatchOut(
                    id=row[0],
                    logged_in_user=row[1],
                    match_id=row[2],
                    matched_user=row[3],
                    mbti_strength=row[4],
                    liked=row[5],
                    created_on=row[6]
                )
                return potentialMatch


    def get_potential_matches_by_user(self, logged_in_user: int) -> List[PotentialMatchOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, logged_in_user, match_id, matched_user,
                    mbti_strength, liked, created_on
                    FROM potential_matches
                    WHERE logged_in_user = %s;
                    """,
                    [logged_in_user],
                )
                rows = cur.fetchall()
                if rows is None:
                    return None

                potential_matches = []
                for row in rows:
                    potential_match = PotentialMatchOut(
                        id=row[0],
                        logged_in_user=row[1],
                        match_id=row[2],
                        matched_user=row[3],
                        mbti_strength=row[4],
                        liked=row[5],
                        created_on=row[6]
                    )
                    potential_matches.append(potential_match)
                return potential_matches


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
                    RETURNING id, logged_in_user, match_id, matched_user,
                    mbti_strength, liked, created_on;
                    """,
                    (liked, match_id),
                )
                row = cur.fetchone()
                if row is not None:
                    return PotentialMatchOut(*row)

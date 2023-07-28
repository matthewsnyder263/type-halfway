import os
from psycopg_pool import ConnectionPool

from pydantic import BaseModel
from typing import List
from datetime import datetime

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Match(BaseModel):
    id: int
    logged_in_user: int
    matched_user: int
    mutual: bool
    match_timestamp: datetime


class MatchIn(BaseModel):
    logged_in_user: int
    matched_user: int
    mutual: bool = False
    match_timestamp: datetime


class MatchesOut(BaseModel):
    matches: List[Match]


class MatchOut(BaseModel):
    id: int
    logged_in_user: int
    user_id: int


class MatchQueries:
    def get(self, match_id: int) -> Match:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user,
                        , mutual
                    FROM matches
                    WHERE id = %s,
                    """,
                    [match_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Match(
                    id=record[0],
                    logged_in_user=record[1],
                    matched_user=record[2],
                    mutual=record[3],
                )

    def get_match(self, logged_in_user: int, matched_user: int) -> Match:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                        , match_timestamp
                    FROM matches
                    WHERE (logged_in_user = %s AND matched_user = %s)
                    OR (logged_in_user = %s AND matched_user = %s);
                    """,
                    [
                        logged_in_user,
                        matched_user,
                        matched_user,
                        logged_in_user,
                    ],
                )
                record = db.fetchone()
                if record is None:
                    return None

                match = Match(
                    id=record[0],
                    logged_in_user=record[1],
                    matched_user=record[2],
                    mutual=record[3],
                    match_timestamp=record[4],
                )
                return match

    def get_matches(self) -> MatchesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual, match_timestamp
                    FROM matches;
                    """
                )
                records = db.fetchall()
                matches = [
                    Match(
                        id=record[0],
                        logged_in_user=record[1],
                        matched_user=record[2],
                        mutual=record[3],
                        match_timestamp=record[4],
                    )
                    for record in records
                ]
                return MatchesOut(matches=matches)

    def get_mutual_matches(self, user_id: int) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                        , match_timestamp
                    FROM matches
                    WHERE (logged_in_user = %s OR matched_user = %s)
                    AND mutual = True
                    """,
                    [user_id, user_id],
                )
                records = result.fetchall()
                matches = []
                for record in records:
                    matches.append(
                        Match(
                            id=record[0],
                            logged_in_user=record[1],
                            matched_user=record[2],
                            mutual=record[3],
                            match_timestamp=record[4],
                        )
                    )
                return matches

    def get_match_by_id(self, match_id: int) -> Match:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual, match_timestamp
                    FROM matches
                    WHERE id = %s;
                    """,
                    [match_id],
                )
                record = db.fetchone()
                if record is None:
                    return None

                match = Match(
                    id=record[0],
                    logged_in_user=record[1],
                    matched_user=record[2],
                    mutual=record[3],
                    match_timestamp=record[4],
                )
                return match

    def create_match(self, match: MatchIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                now = datetime.now()
                result = db.execute(
                    """
                    INSERT INTO matches (
                        logged_in_user,
                        matched_user,
                        mutual,
                        match_timestamp
                        )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, match_timestamp;
                    """,
                    [
                        match.logged_in_user,
                        match.matched_user,
                        match.mutual,
                        now,
                    ],
                )
                id, match_timestamp = result.fetchone()
                return Match(
                    id=id,
                    logged_in_user=match.logged_in_user,
                    matched_user=match.matched_user,
                    mutual=match.mutual,
                    match_timestamp=match_timestamp,
                )

    def update_match(self, match: Match):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    match.logged_in_user,
                    match.matched_user,
                    match.mutual,
                    datetime.now(),
                    match.id,
                ]
                cur.execute(
                    """
                    UPDATE matches
                    SET logged_in_user = %s
                    , matched_user = %s
                    , mutual = %s
                    , match_timestamp = %s
                    WHERE id = %s
                    RETURNING id, logged_in_user, matched_user, mutual
                    """,
                    params,
                )
                conn.commit()
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def delete_match(self, match_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM matches
                    WHERE id = %s
                    RETURNING id
                    """,
                    [match_id],
                )
                result = cur.fetchone()
                if result is None:
                    return None
                return {"id": result[0]}

    def get_likes(self, user_id: int) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                        , match_timestamp
                    FROM matches
                    WHERE logged_in_user = %s
                    """,
                    [user_id],
                )
                records = result.fetchall()
                likes = []
                for record in records:
                    likes.append(
                        Match(
                            id=record[0],
                            logged_in_user=record[1],
                            matched_user=record[2],
                            mutual=record[3],
                            match_timestamp=record[4],
                        )
                    )
                return likes

    def get_likes_without_match(self, user_id: int) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                    FROM matches
                    WHERE logged_in_user = %s AND mutual = False
                    """,
                    [user_id],
                )
                records = result.fetchall()
                likes = []
                for record in records:
                    likes.append(
                        Match(
                            id=record[0],
                            logged_in_user=record[1],
                            matched_user=record[2],
                            mutual=record[3],
                        )
                    )
                return likes

    def get_likes_with_match(self, user_id: int) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                        , match_timestamp
                    FROM matches
                    WHERE logged_in_user = %s AND mutual = True
                    """,
                    [user_id],
                )
                records = result.fetchall()
                likes = []
                for record in records:
                    likes.append(
                        Match(
                            id=record[0],
                            logged_in_user=record[1],
                            matched_user=record[2],
                            mutual=record[3],
                            match_timestamp=record[4],
                        )
                    )
                return likes

    def get_all_matches(self) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual, match_timestamp
                    FROM matches
                    WHERE mutual = True
                    """
                )
                records = db.fetchall()
                matches = [
                    Match(
                        id=record[0],
                        logged_in_user=record[1],
                        matched_user=record[2],
                        mutual=record[3],
                        match_timestamp=record[4],
                    )
                    for record in records
                ]
                return matches

    def get_all_likes(self) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual, match_timestamp
                    FROM matches
                    """
                )
                records = db.fetchall()
                likes = [
                    Match(
                        id=record[0],
                        logged_in_user=record[1],
                        matched_user=record[2],
                        mutual=record[3],
                        match_timestamp=record[4],
                    )
                    for record in records
                ]
                return likes

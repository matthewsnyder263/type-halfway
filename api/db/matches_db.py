import os
from psycopg_pool import ConnectionPool

# from models import User, UserIn
from pydantic import BaseModel
from typing import List

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Match(BaseModel):
    id: int
    logged_in_user: int
    matched_user: int
    mutual: bool


class MatchIn(BaseModel):
    logged_in_user: int
    matched_user: int
    mutual: bool = False


class MatchesOut(BaseModel):
    matches: List[Match]


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
                )
                return match

    def get_matches(self) -> MatchesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual
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
                    )
                    for record in records
                ]
                # it's set to return mbtis=mbtis b/c MbtisOut expects a dictionary, not a list
                return MatchesOut(matches=matches)

    # import sqlalchemy to use or_, or specifically import it

    # def get_mutual_matches_for_user(self, user_id: int):
    #     matches = (
    #         self.session.query(Match)
    #         .filter(or_(Match.logged_in_user == user_id, Match.matched_user == user_id))
    #         .filter(Match.mutual.is_(True))
    #         .all()
    #     )
    #     return matches

    def get_mutual_matches(self, user_id: int) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                    FROM matches
                    WHERE (logged_in_user = %s OR matched_user = %s) AND mutual = True
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
                        )
                    )
                return matches

    # import sqlite3

    # def get_mutual_matches(user_id):
    #     connection = sqlite3.connect("my_database.db")
    #     cursor = connection.cursor()

    #     # Remember to use parameter substitution (`?`) to avoid SQL injection attacks
    #     query = """
    #     SELECT * FROM Matches
    #     WHERE (logged_in_user = ? AND mutual = 1)
    #     OR (matched_user = ? AND mutual = 1)
    #     """
    #     cursor.execute(query, (user_id, user_id))

    #     rows = cursor.fetchall()
    #     for row in rows:
    #         print(row)

    #     connection.close()

    def get_match_by_id(self, match_id: int) -> Match:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
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
                )
                return match

    # def create_match(self, info: Match, hashed_password: str):
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 INSERT INTO matches (
    #                     logged_in_user,
    #                     matched_user,
    #                     mutual
    #                     )
    #                 VALUES (%s, %s, %s)
    #                 RETURNING id;
    #                 """,
    #                 [
    #                     info.logged_in_user,
    #                     info.matched_user,
    #                     info.mutual,
    #                 ],
    #             )
    #             id = result.fetchone()[0]
    #             return Match(
    #                 id=id,
    #                 logged_in_user=info.logged_in_user,
    #                 username=info.matched_user,
    #                 mutual=info.mutual,
    #             )

    def create_match(self, match: MatchIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO matches (
                        logged_in_user,
                        matched_user,
                        mutual
                        )
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        match.logged_in_user,
                        match.matched_user,
                        match.mutual,
                    ],
                )
                id = result.fetchone()[0]
                return Match(
                    id=id,
                    logged_in_user=match.logged_in_user,
                    matched_user=match.matched_user,
                    mutual=match.mutual,
                )

    def update_match(self, match: Match):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    match.logged_in_user,
                    match.matched_user,
                    match.mutual,
                    match.id,  # make sure match.id is available
                ]
                cur.execute(
                    """
                    UPDATE matches
                    SET logged_in_user = %s
                    , matched_user = %s
                    , mutual = %s
                    WHERE id = %s
                    RETURNING id, logged_in_user, matched_user, mutual
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

    def delete_match(self, match_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM matches
                    WHERE id = %s;
                    """,
                    [match_id],
                )

    def get_likes(self, user_id: int) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , logged_in_user
                        , matched_user
                        , mutual
                    FROM matches
                    WHERE logged_in_user = %s
                    """,
                    [user_id],
                )  # note i took out AND mutual = False, in 'WHERE logged_in_user = %S AND mutual = False'
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
                        )
                    )
                return likes

    def get_all_matches(self) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual
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
                    )
                    for record in records
                ]
                return matches

    def get_all_likes(self) -> List[Match]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, logged_in_user, matched_user, mutual
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
                    )
                    for record in records
                ]
                return likes

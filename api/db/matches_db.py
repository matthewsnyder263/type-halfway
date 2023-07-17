import os
from psycopg_pool import ConnectionPool

# from models import User, UserIn
from pydantic import BaseModel
from typing import List

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Match(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    mutual: bool


class MatchesOut(BaseModel):
    matches: List[Match]


class MatchQueries:
    def get(self, match_id: int) -> Match:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , user1_id
                        , user2_id,
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
                    user1_id=record[1],
                    user2_id=record[2],
                    mutual=record[3],
                )

    def get_matches(self) -> MatchesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, user1_id, user2_id, mutual
                    FROM matches;
                    """
                )
                records = db.fetchall()
                matches = [
                    Match(
                        id=record[0],
                        user1_id=record[1],
                        user2_id=record[2],
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
    #         .filter(or_(Match.user1_id == user_id, Match.user2_id == user_id))
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
                        , user1_id
                        , user2_id
                        , mutual
                    FROM matches
                    WHERE (user1_id = %s OR user2_id = %s) AND mutual = True
                    """,
                    [user_id, user_id],
                )
                records = result.fetchall()
                matches = []
                for record in records:
                    matches.append(
                        Match(
                            id=record[0],
                            user1_id=record[1],
                            user2_id=record[2],
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
    #     WHERE (user1_id = ? AND mutual = 1)
    #     OR (user2_id = ? AND mutual = 1)
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
                        , user1_id
                        , user2_id
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
                    user1_id=record[1],
                    user2_id=record[2],
                    mutual=record[3],
                )
                return match

    def create_match(self, info: Match, hashed_password: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO matches (
                        user1_id,
                        user2_id,
                        mutual
                        )
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.user1_id,
                        info.user2_id,
                        info.mutual,
                    ],
                )
                id = result.fetchone()[0]
                return Match(
                    id=id,
                    user1_id=info.user1_id,
                    username=info.user2_id,
                    mutual=info.mutual,
                )

    def update_match(self, match_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.user1_id,
                    data.user2_id,
                    data.mutual,
                ]
                cur.execute(
                    """
                    UPDATE matches
                    SET user1_id = %s
                    , user2_id = %s
                    , mutual = %s
                    WHERE id = %s
                    RETURNING id, user1_id, user2_id, mutual
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

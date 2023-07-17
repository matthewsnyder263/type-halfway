import os
from psycopg_pool import ConnectionPool

# from models import User, UserIn
from pydantic import BaseModel
from typing import List

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Mbti(BaseModel):
    id: int
    # change database/sql file to name and change mbti_score to mbti?
    score: str


class MbtisOut(BaseModel):
    mbtis: List[Mbti]


class MbtiQueries:
    def get_mbtis(self) -> MbtisOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, score
                    FROM mbtis;
                    """
                )
                records = db.fetchall()
                mbtis = [
                    Mbti(
                        id=record[0],
                        score=record[1],
                    )
                    for record in records
                ]
                # it's set to return mbtis=mbtis b/c MbtisOut expects a dictionary, not a list
                return MbtisOut(mbtis=mbtis)

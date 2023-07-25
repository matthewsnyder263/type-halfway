from fastapi import (
    HTTPException,
)
import os
from psycopg_pool import ConnectionPool
from typing import List
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class GenderDB(BaseModel):
    id: int
    gender: str


class GenderOut(BaseModel):
    id: int
    gender: List[str]


class GenderQueries:
    def get(self) -> List[GenderOut]:
        with pool.get() as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM genders")
            rows = cur.fetchall()
            genders = []
            for row in rows:
                genders.append(GenderOut(id=row[0], gender=row[1]))
            return genders

    def get_by_id(self, id: int) -> GenderOut:
        with pool.get() as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM genders WHERE id = %s", (id,))
            row = cur.fetchone()
            if row:
                return GenderOut(id=row[0], gender=row[1])
            else:
                raise HTTPException(
                    status_code=404, detail=f"Gender with id {id} not found"
                )

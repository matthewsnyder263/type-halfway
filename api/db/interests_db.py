# import os
# from psycopg_pool import ConnectionPool

# # from models import User, UserIn
# from pydantic import BaseModel
# from typing import List

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


# class InterestIn(BaseModel):
#     interest_name: str


# class InterestOut(BaseModel):
#     id: int
#     interest_name: str


# class InterestsOut(BaseModel):
#     interests: List[InterestOut]


# class InterestQueries:
#     def get_interests(self) -> InterestsOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT id, interest_name
#                     FROM interests;
#                     """
#                 )
#                 records = db.fetchall()
#                 interests = [
#                     InterestOut(
#                         id=record[0],
#                         interest_name=record[1],
#                     )
#                     for record in records
#                 ]
#                 # it's set to return interests=interests b/c InterestsOut expects a dictionary, not a list
#                 return InterestsOut(interests=interests)

#     def create_interest(self, data: InterestIn):
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO interests (interest_name)
#                     VALUES (%S)
#                     RETURNING id;
#                     """,
#                     [data.interest_name],
#                 )
#                 id = result.fetchone()[0]
#                 return InterestOut(
#                     id=id,
#                     interest_name=data.interest_name,
#                 )

#     def delete_interest(self, interest_id: int):
#         with pool.connection as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     DELETE FROM interests
#                     WHERE id = %s;
#                     """,
#                     [interest_id],
#                 )

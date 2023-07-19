import os
from psycopg_pool import ConnectionPool
from typing import List
from pydantic import BaseModel


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Compatibility(BaseModel):
    id: int
    user_id_1: int
    user_id_2: int
    strength: float


class CompatibilityIn(BaseModel):
    id: int
    user_id_1: int
    user_id_2: int
    strength: float


class CompatibilityOut(BaseModel):
    id: int
    user_id_1: int
    user_id_2: int
    strength: str
    username: str
    full_name: str
    mbti_id: int


class CompatibilitysOut(BaseModel):
    mbti_id: List[CompatibilityOut]


class CompatibilityQueries:
    def get_compatibility_by_user_id(self, user_id: int) -> CompatibilitysOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT c.id, c.user_id_1, c.user_id_2, c.strength, u.username, u.full_name, u.mbti_id
                    FROM compatibility c
                    INNER JOIN users u ON c.user_id_2 = u.id
                    WHERE c.user_id_1 = %s
                    ORDER BY c.strength DESC
                    """,
                    (user_id,),
                )
                compatibility_records = cur.fetchall()

        compatibilities = []
        for record in compatibility_records:
            compatibility = CompatibilityOut(
                id=record[0],
                user_id_1=record[1],
                user_id_2=record[2],
                strength=record[3],
                username=record[4],
                full_name=record[5],
                mbti_id=record[6],
            )

            compatibilities.append(compatibility)
        return compatibilities

    def calculate_and_save_compatibility(self, user_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM compatibility
                    WHERE user_id_1 = %s;
                    """,
                    (user_id,),
                )
                cur.execute(
                    """
                    INSERT INTO compatibility (user_id_1, user_id_2, strength)
                    SELECT %s, u.id, calculate_compatibility(%s, u.mbti_id)
                    FROM users u
                    WHERE u.id != %s;
                    """,
                    (user_id, user_id, user_id),
                )
                conn.commit()

    # def calculate_and_save_compatibility(self, user_id: int) -> None:
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 """
    #                 DELETE FROM compatibility
    #                 WHERE user_id_1 = %s;
    #                 """,
    #                 (user_id,),
    #             )
    #             cur.execute(
    #                 """
    #                 INSERT INTO compatibility (user_id_1, user_id_2, strength)
    #                 SELECT %s, u.id, calculate_compatibility(%s, u.mbti_id)
    #                 FROM users u
    #                 WHERE u.id != %s;
    #                 """,
    #                 (user_id, user_id, user_id),
    #             )
    #             conn.commit()


# class CompatibilityQueries:
#     def get_compatibility_by_user_id(self, user_id: int) -> CompatibilitysOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT c.id, c.user_id_1, c.user_id_2, c.strength, u.username, u.full_name, u.mbti_id
#                     FROM compatibility c
#                     INNER JOIN users u ON c.user_id_2 = u.id
#                     WHERE c.user_id_1 = %s
#                     ORDER BY c.strength DESC
#                     """,
#                     (user_id,),
#                 )
#                 compatibility_records = cur.fetchall()

#         compatibilities = []
#         for record in compatibility_records:
#             compatibility = CompatibilityOut(
#                 id=record[0],
#                 user_id_1=record[1],
#                 user_id_2=record[2],
#                 strength=record[3],
#                 username=record[4],
#                 full_name=record[5],
#                 mbti_id=record[6],
#             )

#             compatibilities.append(compatibility)
#         return compatibilities

#     def calculate_and_save_compatibility(self, user_id: int) -> None:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM compatibility
#                     WHERE user_id_1 = %s;
#                     """,
#                     (user_id,),
#                 )
#                 cur.execute(
#                     """
#                     INSERT INTO compatibility (user_id_1, user_id_2, strength)
#                     SELECT %s, u.id, calculate_compatibility(%s, u.mbti_id)
#                     FROM users u
#                     WHERE u.id != %s;
#                     """,
#                     (user_id, user_id, user_id),
#                 )
#                 conn.commit()


#
# class CompatibilityQueries:
#     def get_compatibility_by_user_id(self, user_id: int) -> CompatibilitysOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT c.id, c.user_id_1, c.user_id_2, c.strength, u.username, u.full_name, u.mbti_id
#                     FROM compatibility c
#                     INNER JOIN users u ON c.user_id_2 = u.id
#                     WHERE c.user_id_2 = %s
#                     ORDER BY c.strength DESC
#                     """,
#                     (user_id,),
#                 )
#                 compatibility_records = cur.fetchall()

#         compatibilities = []
#         for record in compatibility_records:
#             compatibility = CompatibilityOut(
#                             id=record[0],
#                             user_id_1=record[1],
#                             user_id_2=record[2],
#                             strength=record[3],
#                             username=record[4],
#                             full_name=record[5],
#                             mbti_id=record[6],
#             )

#             compatibilities.append(compatibility)
#         return compatibilities

#     def calculate_and_save_compatibility(self, user_id: int) -> None:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM compatibility
#                     WHERE user_id_2 = %s;
#                     """,
#                     (user_id,),
#                 )
#                 cur.execute(
#                     """
#                     INSERT INTO compatibility (user_id, compatible_user_id, compatibility_score)
#                     SELECT %s, u.id, calculate_compatibility(%s, u.mbti_id)
#                     FROM users u
#                     WHERE u.id != %s;
#                     """,
#                     (user_id, user_id, user_id),
#                 )
#                 conn.commit()

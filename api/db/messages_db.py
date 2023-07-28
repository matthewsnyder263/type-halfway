import os
from psycopg_pool import ConnectionPool
from typing import List
from pydantic import BaseModel
from datetime import datetime

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class MessageIn(BaseModel):
    sender_id: int
    receiver_id: int
    message: str


class MessageOut(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    message: str
    timestamp: datetime


class MessagesOut(BaseModel):
    messages: List[MessageOut]


def parse_timestamp(ts):
    # replace 'Z' with '+00:00'
    ts = ts.replace("Z", "+00:00")
    return datetime.fromisoformat(ts)


class MessageQueries:
    def get_messages(self, sender_id: int, receiver_id: int) -> MessagesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, sender_id, receiver_id, message, timestamp
                    FROM messages
                    WHERE (sender_id = %s AND receiver_id = %s)
                    OR (sender_id = %s AND receiver_id = %s)
                    ORDER BY timestamp ASC;
                    """,
                    (sender_id, receiver_id, receiver_id, sender_id),
                )
                records = db.fetchall()
                messages = [
                    MessageOut(
                        id=record[0],
                        sender_id=record[1],
                        receiver_id=record[2],
                        message=record[3],
                        timestamp=record[4],
                    )
                    for record in records
                ]
                return MessagesOut(messages=messages)

    # def send_message(self, message: MessageIn) -> MessageOut:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 INSERT INTO messages(sender_id, receiver_id, message)
    #                 VALUES(%s, %s, %s)
    #                 RETURNING id, sender_id, receiver_id, message, timestamp;
    #                 """,
    #                 (message.sender_id, message.receiver_id, message.message),
    #             )
    #             record = db.fetchone()
    #             return MessageOut(
    #                 id=record[0],
    #                 sender_id=record[1],
    #                 receiver_id=record[2],
    #                 message=record[3],
    #                 timestamp=record[4],
    #             )

    def send_message(self, message: MessageIn) -> MessageOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                timestamp = datetime.utcnow()
                db.execute(
                    """
                    INSERT INTO messages(sender_id, receiver_id, message, timestamp)
                    VALUES(%s, %s, %s, %s)
                    RETURNING id, sender_id, receiver_id, message, timestamp;
                    """,
                    (
                        message.sender_id,
                        message.receiver_id,
                        message.message,
                        timestamp,
                    ),
                )
                record = db.fetchone()
                return MessageOut(
                    id=record[0],
                    sender_id=record[1],
                    receiver_id=record[2],
                    message=record[3],
                    timestamp=record[4],
                )

    def delete_message(self, message_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM messages
                    WHERE id = %s;
                    """,
                    (message_id,),
                )

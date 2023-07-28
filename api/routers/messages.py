from fastapi import (
    Body,
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
    logger,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from db.messages_db import MessageIn, MessageOut, MessagesOut, MessageQueries

router = APIRouter()

from fastapi import HTTPException, status


@router.get(
    "/api/messages/{sender_id}/{receiver_id}", response_model=MessagesOut
)
def get_messages(
    sender_id: int, receiver_id: int, queries: MessageQueries = Depends()
):
    return queries.get_messages(sender_id, receiver_id)


@router.post("/api/messages", response_model=MessageOut)
def send_message(message: MessageIn, queries: MessageQueries = Depends()):
    return queries.send_message(message)


@router.delete("/api/messages/{message_id}", response_model=bool)
def delete_message(message_id: int, queries: MessageQueries = Depends()):
    queries.delete_message(message_id)
    return True

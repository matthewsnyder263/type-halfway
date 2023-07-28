from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import (
    users,
    potential_matches,
    matches,
    chat,
    messages,
)
import os


app = FastAPI(debug=True)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get(
            "CORS_HOST",
            "http://localhost:3000",
        )
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


app.include_router(users.router)
app.include_router(potential_matches.router)
app.include_router(matches.router)
app.include_router(chat.router)
app.include_router(messages.router)
app.include_router(authenticator.router)

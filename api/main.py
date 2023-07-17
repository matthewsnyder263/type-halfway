from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import users, interests, mbti, compatibility, matches
import os
import logging
import sys


app = FastAPI(debug=True)

logging.basicConfig(level=logging.INFO, stream=sys.stdout)


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


app.include_router(authenticator.router)
app.include_router(compatibility.router)
app.include_router(users.router)
app.include_router(interests.router)
app.include_router(mbti.router)
app.include_router(matches.router)

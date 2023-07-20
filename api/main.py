from fastapi import FastAPI  # HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

# import requests
from authenticator import authenticator
from routers import users, gender  # , interests, potential_matches, matches

# import os

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


app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(gender.router)

# snyder edit.. added router include below
# app.include_router(matches.router)
# snyder edit above code


# app.include_router(interests.router)
# app.include_router(mbti.router)

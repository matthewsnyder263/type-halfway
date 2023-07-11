from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from authenticator import authenticator
from routers import users

# import urllib
# import asyncio
# from dotenv import load_dotenv


# load_dotenv()
# api_key = os.environ.get("GOOGLE_API_KEY")

app = FastAPI(debug=True)
app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
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


# loop = asyncio.get_event_loop()
# distance = loop.run_until_complete(
#     get_distance("Hartsdale, NY", "Morris Plains, NJ")
# )

# @app.get("/distance/")
# async def get_distance(origin: str, destination: str):
#     origin = urllib.parse.quote(origin)  # encode the origin
#     destination = urllib.parse.quote(destination)  # encode the destination

#     # Getting distance
#     url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&mode=driving&language=en-EN&units=imperial&key=AIzaSyCzXHPze0diUQCs1cukazc_MzZY71NqB1A"
#     response = requests.get(url)
#     data = response.json()

#     # Getting directions
#     url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&mode=driving&language=en-EN&units=imperial&key=AIzaSyCzXHPze0diUQCs1cukazc_MzZY71NqB1A"
#     response = requests.get(url)
#     steps = response.json()["routes"][0]["legs"][0]["steps"]
#     # print(steps)

#     if not data["rows"]:
#         raise HTTPException(
#             status_code=400, detail="No data returned from the API"
#         )

#     # distance_text = data["rows"][0]["elements"][0]["distance"]["text"]
#     distance_value = data["rows"][0]["elements"][0]["distance"]["value"]

#     halfway_miles = distance_value / 2
#     print("HALFWAY MILES:", halfway_miles, "DISTANCE:", distance_value)
#     total_distance = 0
#     for step in steps:
#         total_distance += step["distance"]["value"]
#         if total_distance >= halfway_miles:
#             halfway_point = step["end_location"]
#             break

#     # Get places around halfway point
#     url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
#     payload = {
#         "location": f"{halfway_point['lat']},{halfway_point['lng']}",
#         "radius": "8047",  # search within approximately 5 miles
#         "type": "restaurant",  # looking for restaurants
#         "key": "AIzaSyCzXHPze0diUQCs1cukazc_MzZY71NqB1A",
#     }
#     response = requests.get(url, params=payload)
#     places = response.json()["results"]

#     # Return list of place names
#     return {
#         "places": [
#             {"name": place["name"], "address": place["vicinity"]}
#             for place in places
#         ]
#     }

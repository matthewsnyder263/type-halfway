from googlemaps import Client
import googlemaps
import os
import sys
from googlemaps.places import places_nearby
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("GOOGLE_API_KEY")
maps = Client(key=api_key)

# Geocode origin and destination
origin = maps.geocode("10033")[0]["geometry"]["location"]
dest = maps.geocode("07950")[0]["geometry"]["location"]


# Calculate the midpoint
midpoint_latitude = (origin["lat"] + dest["lat"]) / 2
midpoint_longitude = (origin["lng"] + dest["lng"]) / 2

results = maps.places_nearby(
    type="gym",
    location=(midpoint_latitude, midpoint_longitude),
    radius=8047,
)

for i in results["results"]:
    name = i.get("name")
    rating = i.get("rating")
    address = i.get("vicinity")

    print(f"Places To Go: {name}, Rating: {rating}, Address: {address}")

CITY_COORDINATES = {
    "Raipur": (21.2514, 81.6296),
    "Delhi": (28.6139, 77.2090),
    "Mumbai": (19.0760, 72.8777),
    "Kolkata": (22.5726, 88.3639),
    "Chennai": (13.0827, 80.2707)
}


def check_location(city, latitude, longitude):

    if city not in CITY_COORDINATES:
        return 0.5

    city_lat, city_lon = CITY_COORDINATES[city]

    lat_difference = abs(city_lat - latitude)
    lon_difference = abs(city_lon - longitude)

    # Simple distance approximation for now
    if lat_difference < 0.5 and lon_difference < 0.5:
        return 1.0

    elif lat_difference < 1.0 and lon_difference < 1.0:
        return 0.7

    else:
        return 0.0
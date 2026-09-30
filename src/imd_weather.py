import pandas as pd


# Load official IMD rainfall data
df = pd.read_csv(
    "data/rainfall_districtwise_daily_imd.csv"
)


def get_imd_rainfall(state, district, date):

    # Find matching location and date
    result = df[
        (df["State"].str.upper() == state.upper()) &
        (df["District"].str.upper() == district.upper()) &
        (df["Date"] == date)
    ]

    # No matching data found
    if result.empty:
        return None

    row = result.iloc[0]

    return {
        "state": row["State"],
        "district": row["District"],
        "date": row["Date"],
        "daily_actual": float(row["Daily Actual"]),
        "daily_normal": float(row["Daily Normal"]),
        "daily_departure": row["Daily Departure Per"],
        "daily_category": row["Daily Category"]
    }


# Test
if __name__ == "__main__":

    result = get_imd_rainfall(
        "CHHATISGARH",
        "RAIPUR",
        "2026-08-25"
    )

    print("\nIMD WEATHER DATA")
    print("--------------------")
    print(result)
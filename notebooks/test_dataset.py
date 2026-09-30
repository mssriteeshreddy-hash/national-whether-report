import pandas as pd

df = pd.read_csv("data/weather_reports.csv")

print(df.head())
print()
print("Number of reports:", len(df))
print()
print("Event categories:")
print(df["event"].value_counts())
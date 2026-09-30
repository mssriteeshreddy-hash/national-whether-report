from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from src.pipeline import process_report


app = FastAPI()


class WeatherReport(BaseModel):

    text: str
    city: str
    latitude: float
    longitude: float
    state: str
    district: str
    source: str
    timestamp: str
    existing_reports: List[str] = []


class WeatherAnalysis(BaseModel):

    event: str
    event_confidence: float
    confidence_level: str

    duplicate: bool
    similarity: float

    source_reliability: float
    location_match: float
    time_match: float

    imd_data: dict | None
    imd_rainfall: float | None
    imd_category: str | None
    imd_match: float

    verification_score: float
    status: str


@app.get("/")
def home():

    return {
        "message": "Weather AI API is running"
    }


@app.post("/analyze", response_model=WeatherAnalysis)
def analyze_report(report: WeatherReport):

    report_data = report.model_dump()

    existing_reports = report_data.pop(
        "existing_reports",
        []
    )

    result = process_report(
        report_data,
        existing_reports
    )

    return result
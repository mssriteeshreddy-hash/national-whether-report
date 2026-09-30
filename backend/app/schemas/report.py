from datetime import datetime

from pydantic import BaseModel, Field


class ReportCreate(BaseModel):

    source: str = Field(
        min_length=2,
        max_length=50
    )

    description: str = Field(
        min_length=5,
        max_length=5000
    )

    date_time: datetime

    state: str = Field(
        min_length=2,
        max_length=100
    )

    city: str = Field(
        min_length=2,
        max_length=100
    )

    latitude: float = Field(
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ge=-180,
        le=180
    )

    event_type: str = Field(
        min_length=2,
        max_length=100
    )

    image_url: str | None = None
    video_url: str | None = None

    ai_confidence: float | None = Field(
        default=None,
        ge=0,
        le=100
    )

    verification_status: str = "Needs Review"

    duplicate_status: str = "Unique"


class ReportResponse(ReportCreate):

    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
from datetime import datetime
from typing import Optional

from pydantic import (
    BaseModel,
    Field,
    ConfigDict
)


class ReportCreate(BaseModel):

    description: str = Field(
        min_length=5,
        max_length=5000
    )

    event_type: str

    source: str = "citizen"

    state: str

    city: str

    latitude: Optional[float] = Field(
        default=None,
        ge=-90,
        le=90
    )

    longitude: Optional[float] = Field(
        default=None,
        ge=-180,
        le=180
    )

    image_url: Optional[str] = None

    video_url: Optional[str] = None


class ReportOut(ReportCreate):

    id: int

    ai_confidence: float

    verification_status: str

    is_duplicate: bool

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    Boolean,
    DateTime
)

from .database import Base


class Report(Base):

    __tablename__ = "reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    description = Column(
        Text,
        nullable=False
    )

    event_type = Column(
        String(50),
        nullable=False,
        index=True
    )

    source = Column(
        String(100),
        default="citizen"
    )

    state = Column(
        String(100),
        nullable=False,
        index=True
    )

    city = Column(
        String(100),
        nullable=False,
        index=True
    )

    latitude = Column(
        Float,
        nullable=True
    )

    longitude = Column(
        Float,
        nullable=True
    )

    image_url = Column(
        String(500),
        nullable=True
    )

    video_url = Column(
        String(500),
        nullable=True
    )

    ai_confidence = Column(
        Float,
        default=0.0
    )

    verification_status = Column(
        String(30),
        default="pending",
        index=True
    )

    is_duplicate = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )
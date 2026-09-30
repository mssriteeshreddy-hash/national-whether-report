from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    Float,
    DateTime,
    Integer,
    Boolean,
    Index,
)

from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Report(Base):

    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    source: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    date_time: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        index=True
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True
    )

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    event_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True
    )

    image_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    video_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    ai_confidence: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    verification_status: Mapped[str] = mapped_column(
        String(50),
        default="Needs Review",
        index=True
    )

    duplicate_status: Mapped[str] = mapped_column(
        String(50),
        default="Unique"
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


Index(
    "idx_reports_location",
    Report.state,
    Report.city
)

Index(
    "idx_reports_event_status",
    Report.event_type,
    Report.verification_status
)
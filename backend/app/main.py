from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    Query
)

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from sqlalchemy import func

from .database import (
    Base,
    engine,
    get_db
)

from .models import Report

from .schemas import (
    ReportCreate,
    ReportOut
)

from .services.verification import (
    classify_report
)

from .services.duplicate_detection import (
    is_duplicate
)


# Create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="National Weather Big Data Analytics Platform",
    description=(
        "Weather report collection, "
        "verification and analytics platform"
    ),
    version="1.0.0"
)


# ------------------------------------------------
# CORS
# ------------------------------------------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# ------------------------------------------------
# ROOT
# ------------------------------------------------

@app.get("/")
def root():

    return {
        "message":
            "National Weather Platform API",

        "status":
            "running"
    }


# ------------------------------------------------
# HEALTH
# ------------------------------------------------

@app.get("/health")
def health():

    return {
        "status":
            "healthy"
    }


# ------------------------------------------------
# CREATE REPORT
# ------------------------------------------------

@app.post(
    "/api/reports",
    response_model=ReportOut
)
def create_report(
    payload: ReportCreate,
    db: Session = Depends(get_db)
):

    # Check duplicate
    duplicate = is_duplicate(
        db,
        payload.description,
        payload.city
    )

    # Verification
    score, status, reasons = classify_report(
        payload,
        duplicate
    )

    # Create database record
    report = Report(

        **payload.model_dump(),

        ai_confidence=score,

        verification_status=status,

        is_duplicate=duplicate
    )

    db.add(report)

    db.commit()

    db.refresh(report)

    return report


# ------------------------------------------------
# GET REPORTS
# ------------------------------------------------

@app.get(
    "/api/reports",
    response_model=list[ReportOut]
)
def list_reports(

    state: str | None = None,

    city: str | None = None,

    event_type: str | None = None,

    verification_status: str | None = None,

    limit: int = Query(
        100,
        ge=1,
        le=500
    ),

    db: Session = Depends(get_db)
):

    query = db.query(Report)

    if state:

        query = query.filter(
            Report.state.ilike(
                f"%{state}%"
            )
        )

    if city:

        query = query.filter(
            Report.city.ilike(
                f"%{city}%"
            )
        )

    if event_type:

        query = query.filter(
            Report.event_type ==
            event_type
        )

    if verification_status:

        query = query.filter(
            Report.verification_status ==
            verification_status
        )

    return (
        query
        .order_by(
            Report.created_at.desc()
        )
        .limit(limit)
        .all()
    )


# ------------------------------------------------
# GET SINGLE REPORT
# ------------------------------------------------

@app.get(
    "/api/reports/{report_id}",
    response_model=ReportOut
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = db.get(
        Report,
        report_id
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report


# ------------------------------------------------
# ANALYTICS
# ------------------------------------------------

@app.get("/api/analytics")
def analytics(
    db: Session = Depends(get_db)
):

    total = (
        db.query(
            func.count(Report.id)
        )
        .scalar()
        or 0
    )

    verified = (
        db.query(
            func.count(Report.id)
        )
        .filter(
            Report.verification_status
            == "verified"
        )
        .scalar()
        or 0
    )

    pending = (
        db.query(
            func.count(Report.id)
        )
        .filter(
            Report.verification_status
            == "pending"
        )
        .scalar()
        or 0
    )

    suspicious = (
        db.query(
            func.count(Report.id)
        )
        .filter(
            Report.verification_status
            == "suspicious"
        )
        .scalar()
        or 0
    )

    events = (
        db.query(
            Report.event_type,
            func.count(Report.id)
        )
        .group_by(
            Report.event_type
        )
        .all()
    )

    states = (
        db.query(
            Report.state,
            func.count(Report.id)
        )
        .group_by(
            Report.state
        )
        .all()
    )

    return {

        "total_reports": total,

        "verified_reports": verified,

        "pending_reports": pending,

        "suspicious_reports": suspicious,

        "event_stats": [
            {
                "name": event,
                "value": count
            }
            for event, count in events
        ],

        "state_stats": [
            {
                "name": state,
                "value": count
            }
            for state, count in states
        ]
    }
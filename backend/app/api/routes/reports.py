from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.report import Report
from app.schemas.report import (
    ReportCreate,
    ReportResponse,
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.post(
    "",
    response_model=ReportResponse,
    status_code=201
)
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db)
):

    new_report = Report(
        **report.model_dump()
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


@router.get(
    "",
    response_model=list[ReportResponse]
)
def get_reports(

    state: str | None = None,

    city: str | None = None,

    event: str | None = None,

    status: str | None = None,

    source: str | None = None,

    skip: int = Query(
        default=0,
        ge=0
    ),

    limit: int = Query(
        default=50,
        ge=1,
        le=200
    ),

    db: Session = Depends(get_db)
):

    query = db.query(Report).filter(
        Report.is_active == True
    )

    if state:
        query = query.filter(
            Report.state.ilike(f"%{state}%")
        )

    if city:
        query = query.filter(
            Report.city.ilike(f"%{city}%")
        )

    if event:
        query = query.filter(
            Report.event_type.ilike(f"%{event}%")
        )

    if status:
        query = query.filter(
            Report.verification_status.ilike(
                f"%{status}%"
            )
        )

    if source:
        query = query.filter(
            Report.source.ilike(f"%{source}%")
        )

    return (
        query
        .order_by(Report.date_time.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get(
    "/{report_id}",
    response_model=ReportResponse
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = (
        db.query(Report)
        .filter(
            Report.id == report_id,
            Report.is_active == True
        )
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report
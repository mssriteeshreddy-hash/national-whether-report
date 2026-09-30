from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.report import Report


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("")
def analytics(
    db: Session = Depends(get_db)
):

    total_reports = (
        db.query(func.count(Report.id))
        .filter(Report.is_active == True)
        .scalar()
    )

    event_data = (
        db.query(
            Report.event_type,
            func.count(Report.id)
        )
        .filter(Report.is_active == True)
        .group_by(Report.event_type)
        .all()
    )

    state_data = (
        db.query(
            Report.state,
            func.count(Report.id)
        )
        .filter(Report.is_active == True)
        .group_by(Report.state)
        .all()
    )

    status_data = (
        db.query(
            Report.verification_status,
            func.count(Report.id)
        )
        .filter(Report.is_active == True)
        .group_by(Report.verification_status)
        .all()
    )

    return {
        "total_reports": total_reports,

        "event_wise": [
            {
                "name": event,
                "reports": count
            }
            for event, count in event_data
        ],

        "state_wise": [
            {
                "state": state,
                "reports": count
            }
            for state, count in state_data
        ],

        "status_wise": [
            {
                "status": status,
                "reports": count
            }
            for status, count in status_data
        ]
    }
from difflib import SequenceMatcher

from sqlalchemy.orm import Session

from ..models import Report


def is_duplicate(
    db: Session,
    description: str,
    city: str
):

    recent_reports = (
        db.query(Report)
        .filter(
            Report.city.ilike(city)
        )
        .order_by(
            Report.id.desc()
        )
        .limit(50)
        .all()
    )

    for report in recent_reports:

        similarity = SequenceMatcher(
            None,
            description.lower(),
            report.description.lower()
        ).ratio()

        if similarity >= 0.88:

            return True

    return False
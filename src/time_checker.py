from datetime import datetime


def check_time(timestamp):

    try:
        report_time = datetime.fromisoformat(timestamp)

        current_time = datetime.now()

        difference = abs(
            (current_time - report_time).total_seconds()
        )

        # Report within last 24 hours
        if difference <= 24 * 60 * 60:
            return 1.0

        # Report within last 3 days
        elif difference <= 3 * 24 * 60 * 60:
            return 0.7

        else:
            return 0.3

    except:
        return 0.5
    
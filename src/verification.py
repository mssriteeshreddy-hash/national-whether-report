def calculate_verification_score(
    source_reliability,
    event_confidence,
    location_match,
    time_match,
    duplicate,
    imd_match
):
    score = 0

    # Source reliability
    score += source_reliability * 0.25

    # ML event classification confidence
    score += event_confidence * 0.20

    # Location consistency
    score += location_match * 0.20

    # Time consistency
    score += time_match * 0.15

    # Official IMD reference evidence
    score += imd_match * 0.20

    # Duplicate reports do not increase reliability.
    # They are handled separately as a data-quality signal.

    return round(score, 2)


def get_status(score):

    if score >= 0.75:
        return "Likely Reliable"

    elif score >= 0.45:
        return "Needs Review"

    else:
        return "Potentially Unreliable"
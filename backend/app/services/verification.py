def classify_report(data, duplicate=False):

    score = 0.0

    reasons = []

    # 1. Description quality
    if len(data.description.strip()) >= 20:

        score += 0.25

        reasons.append(
            "Detailed description"
        )

    else:

        reasons.append(
            "Short description"
        )

    # 2. GPS information
    if (
        data.latitude is not None
        and data.longitude is not None
    ):

        score += 0.20

        reasons.append(
            "GPS coordinates supplied"
        )

    # 3. Image/video evidence
    if (
        data.image_url
        or data.video_url
    ):

        score += 0.20

        reasons.append(
            "Media attached"
        )

    # 4. Source reliability
    if (
        data.source
        and data.source.lower()
        in {
            "citizen",
            "imd",
            "api",
            "verified_source"
        }
    ):

        score += 0.15

        reasons.append(
            "Recognized source"
        )

    # 5. Duplicate check
    if not duplicate:

        score += 0.20

        reasons.append(
            "No duplicate detected"
        )

    else:

        reasons.append(
            "Potential duplicate"
        )

    # 6. Determine final status

    if duplicate:

        status = "suspicious"

    elif score >= 0.75:

        status = "verified"

    elif score >= 0.45:

        status = "pending"

    else:

        status = "suspicious"

    return (
        round(score, 2),
        status,
        reasons
    )
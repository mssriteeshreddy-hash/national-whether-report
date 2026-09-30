from src.preprocessing import clean_text
from src.predict import predict_event
from src.duplicate_detector import check_duplicate
from src.verification import calculate_verification_score, get_status
from src.source_reliability import get_source_reliability
from src.location_checker import check_location
from src.time_checker import check_time
from src.confidence import get_confidence_level
from src.imd_weather import get_imd_rainfall


def process_report(report, existing_reports):

    # -----------------------------
    # 1. Clean report text
    # -----------------------------
    text = report["text"]
    cleaned_text = clean_text(text)

    # -----------------------------
    # 2. Event classification
    # -----------------------------
    prediction = predict_event(cleaned_text)

    event = prediction["event"]
    confidence = prediction["confidence"]
    confidence_level = get_confidence_level(confidence)

    # -----------------------------
    # 3. Duplicate detection
    # -----------------------------
    duplicate, similarity = check_duplicate(
        cleaned_text,
        existing_reports
    )

    # -----------------------------
    # 4. Source reliability
    # -----------------------------
    source = report.get("source", "unknown")

    source_reliability = get_source_reliability(
        source
    )

    # -----------------------------
    # 5. Location verification
    # -----------------------------
    city = report.get("city")
    latitude = report.get("latitude")
    longitude = report.get("longitude")

    location_match = check_location(
        city,
        latitude,
        longitude
    )

    # -----------------------------
    # 6. Time verification
    # -----------------------------
    timestamp = report.get("timestamp")

    time_match = check_time(
        timestamp
    )

    # -----------------------------
    # 7. IMD official rainfall check
    # -----------------------------
    imd_data = None

    if (
        timestamp
        and report.get("state")
        and report.get("district")
    ):

        imd_date = timestamp[:10]

        print(
            "\nDEBUG IMD STATE:",
            report.get("state")
        )

        print(
            "DEBUG IMD DISTRICT:",
            report.get("district")
        )

        print(
            "DEBUG IMD DATE:",
            imd_date
        )

        imd_data = get_imd_rainfall(
            report.get("state"),
            report.get("district"),
            imd_date
        )

        print(
            "DEBUG IMD DATA:",
            imd_data
        )

    # -----------------------------
    # 8. Calculate IMD match
    # -----------------------------
    imd_match = 0.5

    if imd_data is not None:

        if event in ["Rainfall", "Flood"]:

            if imd_data["daily_actual"] > 0:
                imd_match = 1.0

            else:
                imd_match = 0.3

        else:
            imd_match = 0.5

    # -----------------------------
    # 9. Calculate verification score
    # -----------------------------
    verification_score = calculate_verification_score(
        source_reliability,
        confidence,
        location_match,
        time_match,
        duplicate,
        imd_match
    )

    status = get_status(
        verification_score
    )

    # -----------------------------
    # 10. Final AI result
    # -----------------------------
    return {

        "event": event,

        "event_confidence": confidence,

        "confidence_level": confidence_level,

        "duplicate": duplicate,

        "similarity": round(
            similarity,
            2
        ),

        "source_reliability": source_reliability,

        "location_match": location_match,

        "time_match": time_match,

        "imd_data": imd_data,

        "imd_rainfall": (
            imd_data["daily_actual"]
            if imd_data
            else None
        ),

        "imd_category": (
            imd_data["daily_category"]
            if imd_data
            else None
        ),

        "imd_match": imd_match,

        "verification_score": verification_score,

        "status": status
    }


# =========================================================
# TEST THE COMPLETE PIPELINE
# =========================================================

if __name__ == "__main__":

    report = {

        "text":
        "Heavy rainfall has caused flooding in Raipur",

        "city":
        "Raipur",

        "latitude":
        21.2514,

        "longitude":
        81.6296,

        "state":
        "CHHATISGARH",

        "district":
        "RAIPUR",

        "source":
        "citizen",

        # Current-style test
        "timestamp":
        "2026-09-28T17:00:00"
    }

    existing_reports = [

        "Heavy rainfall reported in Raipur"

    ]

    result = process_report(
        report,
        existing_reports
    )

    print("\n")
    print("AI RESULT")
    print("--------------------")

    print(
        "Event:",
        result["event"]
    )

    print(
        "Event Confidence:",
        result["event_confidence"]
    )

    print(
        "Duplicate:",
        result["duplicate"]
    )

    print(
        "Similarity:",
        result["similarity"]
    )

    print(
        "Verification Score:",
        result["verification_score"]
    )

    print(
        "Status:",
        result["status"]
    )

    print(
        "Location Match:",
        result["location_match"]
    )

    print(
        "Time Match:",
        result["time_match"]
    )

    print(
        "Confidence Level:",
        result["confidence_level"]
    )

    print(
        "IMD Rainfall:",
        result["imd_rainfall"],
        "mm"
    )

    print(
        "IMD Category:",
        result["imd_category"]
    )

    print(
        "IMD Match:",
        result["imd_match"]
    )
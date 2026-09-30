def get_confidence_level(confidence):

    if confidence >= 0.80:
        return "High"

    elif confidence >= 0.50:
        return "Medium"

    else:
        return "Low"
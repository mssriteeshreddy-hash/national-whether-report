SOURCE_RELIABILITY = {
    "IMD": 1.0,
    "government": 0.95,
    "verified_news": 0.85,
    "citizen": 0.60,
    "social_media": 0.40
}


def get_source_reliability(source):

    source = source.lower()

    return SOURCE_RELIABILITY.get(source, 0.50)
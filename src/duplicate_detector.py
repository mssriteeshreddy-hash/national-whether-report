from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load the sentence embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


def check_duplicate(new_report, existing_reports):

    # If there are no previous reports
    if len(existing_reports) == 0:
        return False, 0.0

    # Convert reports into numerical embeddings
    new_embedding = model.encode([new_report])
    existing_embeddings = model.encode(existing_reports)

    # Calculate similarity
    similarities = cosine_similarity(
        new_embedding,
        existing_embeddings
    )

    # Get the highest similarity
    max_similarity = similarities.max()

    # Decide whether it is a duplicate
    if max_similarity >= 0.75:
        return True, float(max_similarity)

    return False, float(max_similarity)

if __name__ == "__main__":

    existing_reports = [
        "Heavy rainfall reported in Raipur",
        "Temperature crossed 45 degrees in Delhi",
        "Dense fog reduced visibility in Mumbai"
    ]

    test_reports = [
    "Heavy rain caused flooding in Raipur",
    "A severe dust storm is affecting Delhi",
    "Strong winds damaged buildings in Mumbai"
]

    for report in test_reports:

        duplicate, similarity = check_duplicate(
            report,
            existing_reports
        )

        print("\nReport:", report)
        print("Duplicate:", duplicate)
        print("Similarity:", round(similarity, 2))
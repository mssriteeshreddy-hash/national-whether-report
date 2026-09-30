import joblib

model = joblib.load("models/weather_classifier.pkl")
vectorizer = joblib.load("models/tfidf_vectorizer.pkl")


def predict_event(text):

    text_tfidf = vectorizer.transform([text])

    prediction = model.predict(text_tfidf)[0]

    probabilities = model.predict_proba(text_tfidf)[0]

    confidence = max(probabilities)

    return {
        "event": prediction,
        "confidence": round(float(confidence), 2)
    }


if __name__ == "__main__":

    text = "Heavy rainfall caused flooding in Raipur"

    result = predict_event(text)

    print(result)
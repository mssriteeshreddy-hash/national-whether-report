import pandas as pd
from preprocessing import clean_text

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


# 1. Load dataset
df = pd.read_csv("data/weather_reports.csv")
df["text"] = df["text"].apply(clean_text)

# 2. Separate input and output
X = df["text"]
y = df["event"]


# 3. Split data into training and testing
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# 4. Convert text into numbers using TF-IDF
vectorizer = TfidfVectorizer()

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)


# 5. Create the ML model
model = LogisticRegression(max_iter=1000)


# 6. Train the model
model.fit(X_train_tfidf, y_train)
import joblib

joblib.dump(model, "models/weather_classifier.pkl")
joblib.dump(vectorizer, "models/tfidf_vectorizer.pkl")

# 7. Test the model
y_pred = model.predict(X_test_tfidf)


# 8. Check accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)


# 9. Detailed performance
print("\nClassification Report:")
print(classification_report(y_test, y_pred, zero_division=0))

# 10. Function to predict a new weather report
def predict_event(text):
    text_tfidf = vectorizer.transform([text])

    prediction = model.predict(text_tfidf)[0]

    probabilities = model.predict_proba(text_tfidf)[0]
    confidence = max(probabilities)

    return prediction, confidence


# 11. Test with a new report
text = "Heavy rain has caused waterlogging in the city"

event, confidence = predict_event(text)

print("\nNew Report:")
print(text)

print("Predicted Event:", event)
print("Confidence:", round(confidence, 2))
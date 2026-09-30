import re


def clean_text(text):
    # Convert text to lowercase
    text = text.lower()

    # Remove extra spaces
    text = text.strip()

    # Remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)

    return text
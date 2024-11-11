import json
import re

def clean_whitespace(text):
    """Remove extra whitespace from the text."""
    return re.sub(r'\s+', ' ', text).strip()

def clean_hadith_data(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for entry in data:
        entry["source"] = clean_whitespace(entry.get("source", ""))
        entry["chapter"] = clean_whitespace(entry.get("chapter", ""))
        entry["text_ar"] = clean_whitespace(entry.get("text_ar", ""))
        entry["text_en"] = clean_whitespace(entry.get("text_en", ""))

    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# Run the function
clean_hadith_data('data/hadith.json')

# Asaan Qanoon AI — Member 3 + Member 5

This package contains only the work owned by:

- **Member 3:** curated legal/civic data, chunking, ChromaDB indexing, retrieval and source metadata.
- **Member 5:** five document templates, validation, PDF generation and QA tests.

It intentionally does **not** include the frontend, Gemini, fallback provider, authentication, Supabase, or Member 1/2/4 logic.

## Files to merge

```text
rag.py
ingest.py
data/legal_sources.json
documents.py
tests/test_member3_5.py
requirements-member3-5.txt
```

Runtime folders created automatically:

```text
chroma_db/
generated_documents/
```

## Install

```powershell
pip install -r requirements-member3-5.txt
```

## Build / refresh RAG

```powershell
python ingest.py
```

The index uses ChromaDB's local persistent collection. No Supabase, PostgreSQL, API key, LangChain, or paid embedding service is required.

## Test retrieval

```powershell
python -c "from rag import search; print(search('mera CNIC expire hogaya hai renewal kaise hoga'))"
```

For a production UI, use the returned fields:

- `content`
- `title`
- `authority`
- `category`
- `jurisdiction`
- `source_url`
- `verified`
- `similarity`

If `grounded` is false, the AI layer should **not** invent an answer from general model knowledge. It should explain that the available verified sources do not establish the requested fact and direct the user to the relevant official source/professional help.

## Document generation

Import into Member 4's backend:

```python
from documents import generate_pdf, list_templates
```

Example:

```python
path = generate_pdf("general_application", {
    "applicant_name": "Fozia Roshan",
    "cnic": "00000-0000000-0",
    "address": "Karachi",
    "authority": "Concerned Authority",
    "subject": "Request for assistance",
    "body": "Write the application body here.",
    "date": "2026-09-12",
})
```

Available templates:

1. Loss Affidavit
2. Undertaking
3. General Application
4. Complaint Letter
5. Basic Rent Agreement Draft

These are drafts. The generated PDF deliberately warns users to verify stamp, attestation, registration, jurisdiction and authority-specific requirements before submission.

## QA

```powershell
pytest -q
```

## Data quality rule

The dataset uses official Pakistani government/legal sources and keeps province-specific material labelled as province-specific. Unknown facts are not filled with invented fees, deadlines, organizations, eligibility rules or URLs. The AI integration must preserve this behavior.

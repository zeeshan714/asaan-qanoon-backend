from pathlib import Path
import tempfile

from rag import build_index, load_sources, search
from documents import TEMPLATES, generate_pdf, validate


def test_dataset_is_structured_and_verified():
    sources = load_sources()
    assert len(sources) >= 10
    categories = {item["category"] for item in sources}
    assert {"FIR / Police", "CNIC / NADRA", "Tenant / Rent", "Lost Documents", "Government Complaint"}.issubset(categories)
    assert all(item["verified"] is True for item in sources)
    assert all(item["source_url"].startswith("https://") for item in sources)


def test_chroma_retrieval():
    build_index(reset=True)
    result = search("mera CNIC expire hogaya hai renewal kaise hoga")
    assert result["results"]
    assert result["results"][0]["category"] == "CNIC / NADRA"
    assert result["results"][0]["verified"] is True


def test_rent_retrieval_is_province_aware():
    build_index(reset=False)
    result = search("Sindh mein landlord tenant rent dispute", category="Tenant / Rent")
    assert result["results"]
    assert any(item["jurisdiction"] == "Sindh, Pakistan" for item in result["results"])


def test_document_validation_and_pdf():
    assert set(TEMPLATES) == {"loss_affidavit", "undertaking", "general_application", "complaint_letter", "rent_agreement"}
    missing = validate("general_application", {"applicant_name": "A"})
    assert "authority" in missing

    data = {
        "applicant_name": "Test User", "cnic": "00000-0000000-0", "address": "Karachi",
        "authority": "Concerned Authority", "subject": "General Application",
        "body": "This is a test draft.", "date": "2026-09-12",
    }
    with tempfile.TemporaryDirectory() as tmp:
        path = generate_pdf("general_application", data, tmp)
        assert Path(path).exists()
        assert Path(path).stat().st_size > 1000

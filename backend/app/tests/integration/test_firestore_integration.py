import pytest
from google.cloud import firestore

db = firestore.Client()

@pytest.fixture
def firestore_test_doc():
    doc_ref = db.collection("test").document("test_id")
    doc_ref.set({"name": "test"})
    yield doc_ref
    doc_ref.delete()

def test_firestore_create(firestore_test_doc):
    doc = firestore_test_doc.get()
    assert doc.exists
    assert doc.to_dict()["name"] == "test"

"""Backend tests for Taksh Crafted Veg Experience API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://taksh-crafted.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Taksh" in data["message"]


# ---------- Reservations ----------
class TestReservations:
    def test_create_reservation_valid(self, client):
        payload = {
            "name": "TEST_Aarav Sharma",
            "phone": "+919876543210",
            "email": "test_aarav@example.com",
            "date": "2026-02-14",
            "time": "19:30",
            "guests": 4,
            "occasion": "Anniversary",
            "notes": "Window seat please.",
        }
        r = client.post(f"{API}/reservations", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["status"] == "pending"
        assert data["name"] == payload["name"]
        assert data["guests"] == 4
        assert data["date"] == "2026-02-14"
        assert "_id" not in data

    def test_create_reservation_minimum_required(self, client):
        payload = {
            "name": "TEST_Mini",
            "phone": "9999999999",
            "date": "2026-03-01",
            "time": "20:00",
            "guests": 2,
        }
        r = client.post(f"{API}/reservations", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["email"] is None
        assert data["occasion"] is None
        assert data["notes"] is None
        assert "_id" not in data

    def test_create_reservation_missing_required_returns_422(self, client):
        # Missing phone, date, time, guests
        r = client.post(f"{API}/reservations", json={"name": "TEST_Incomplete"})
        assert r.status_code == 422

    def test_create_reservation_invalid_email_returns_422(self, client):
        payload = {
            "name": "TEST_BadEmail",
            "phone": "9999999999",
            "email": "not-an-email",
            "date": "2026-03-01",
            "time": "20:00",
            "guests": 2,
        }
        r = client.post(f"{API}/reservations", json=payload)
        assert r.status_code == 422

    def test_create_reservation_invalid_guest_count(self, client):
        payload = {
            "name": "TEST_TooMany",
            "phone": "9999999999",
            "date": "2026-03-01",
            "time": "20:00",
            "guests": 100,
        }
        r = client.post(f"{API}/reservations", json=payload)
        assert r.status_code == 422

    def test_list_reservations_persists(self, client):
        # Create one we will look for
        payload = {
            "name": "TEST_Persist",
            "phone": "9123456780",
            "date": "2026-04-10",
            "time": "20:30",
            "guests": 3,
        }
        cr = client.post(f"{API}/reservations", json=payload)
        assert cr.status_code == 201
        new_id = cr.json()["id"]

        r = client.get(f"{API}/reservations")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        for row in rows:
            assert "_id" not in row
        ids = [row["id"] for row in rows]
        assert new_id in ids


# ---------- Contact ----------
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Riya",
            "email": "test_riya@example.com",
            "subject": "Press enquiry",
            "message": "We'd love to feature Taksh in our magazine.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and len(data["id"]) > 0
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "_id" not in data

    def test_create_contact_missing_required_returns_422(self, client):
        r = client.post(f"{API}/contact", json={"name": "TEST_NoMsg", "email": "x@y.com"})
        assert r.status_code == 422

    def test_create_contact_invalid_email_returns_422(self, client):
        r = client.post(
            f"{API}/contact",
            json={"name": "TEST_BadE", "email": "bad", "message": "hello there"},
        )
        assert r.status_code == 422

    def test_list_contact(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        for row in rows:
            assert "_id" not in row

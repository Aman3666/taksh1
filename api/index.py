"""
Vercel serverless entrypoint for Taksh — Crafted Veg Experience API.

This file is mounted by Vercel at every /api/* request (via the rewrite in
vercel.json -> /api/index). It re-implements the same routes as
/app/backend/server.py but uses synchronous PyMongo (recommended for short-
lived Vercel function invocations) instead of async Motor.

Local Emergent dev keeps using /app/backend/server.py — this file is only
exercised on Vercel.
"""

import os
import uuid
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from pymongo import MongoClient

# Load .env when running locally (Vercel injects env vars at runtime instead).
load_dotenv(Path(__file__).resolve().parent.parent / ".env")


# ---------- Lazy DB connection (warm-instance reuse) ----------
@lru_cache(maxsize=1)
def get_db():
    mongo_url = os.environ["MONGO_URL"]
    db_name = os.environ["DB_NAME"]
    client = MongoClient(mongo_url, serverSelectionTimeoutMS=8000)
    return client[db_name]


# ---------- App ----------
app = FastAPI(title="Taksh Crafted Veg Experience API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ReservationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=20)
    email: Optional[EmailStr] = None
    date: str
    time: str
    guests: int = Field(ge=1, le=30)
    occasion: Optional[str] = None
    notes: Optional[str] = Field(default=None, max_length=500)


class Reservation(ReservationCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
    status: str = "pending"


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=2, max_length=2000)


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


# ---------- Routes ----------
@api_router.get("/")
def root():
    return {"message": "Taksh Crafted Veg Experience API"}


@api_router.post("/status", response_model=StatusCheck)
def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(**payload.model_dump())
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    get_db().status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
def list_status_checks():
    rows = list(get_db().status_checks.find({}, {"_id": 0}).limit(1000))
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


@api_router.post("/reservations", response_model=Reservation, status_code=201)
def create_reservation(payload: ReservationCreate):
    reservation = Reservation(**payload.model_dump())
    get_db().reservations.insert_one(reservation.model_dump())
    return reservation


@api_router.get("/reservations", response_model=List[Reservation])
def list_reservations():
    return list(
        get_db()
        .reservations.find({}, {"_id": 0})
        .sort("created_at", -1)
        .limit(500)
    )


@api_router.post("/contact", response_model=Contact, status_code=201)
def create_contact(payload: ContactCreate):
    msg = Contact(**payload.model_dump())
    get_db().contact_messages.insert_one(msg.model_dump())
    return msg


@api_router.get("/contact", response_model=List[Contact])
def list_contact():
    return list(
        get_db()
        .contact_messages.find({}, {"_id": 0})
        .sort("created_at", -1)
        .limit(500)
    )


app.include_router(api_router)

# CORS — allow same-origin (Vercel) and any custom domain you set in env.
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Taksh Crafted Veg Experience API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
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
    date: str  # ISO date YYYY-MM-DD
    time: str  # HH:MM
    guests: int = Field(ge=1, le=30)
    occasion: Optional[str] = None
    notes: Optional[str] = Field(default=None, max_length=500)


class Reservation(ReservationCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "pending"


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=2, max_length=2000)


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Taksh Crafted Veg Experience API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/reservations", response_model=Reservation, status_code=201)
async def create_reservation(payload: ReservationCreate):
    reservation = Reservation(**payload.model_dump())
    doc = reservation.model_dump()
    await db.reservations.insert_one(doc)
    return reservation


@api_router.get("/reservations", response_model=List[Reservation])
async def list_reservations():
    rows = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


@api_router.post("/contact", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate):
    msg = Contact(**payload.model_dump())
    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[Contact])
async def list_contact():
    rows = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

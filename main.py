from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

from database import Base, engine, get_db
from models import Farmer, FoodBatch

# Routers
from routes.farmers import router as farmers_router
from routes.batches import router as batches_router
from routes.surplus import router as surplus_router
from routes.consumer import router as consumer_router


# Ensure DB tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Farm2Fork Backend", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for QR preview
os.makedirs(os.path.join("static", "qr"), exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")


# Include routers
app.include_router(farmers_router)
app.include_router(batches_router)
app.include_router(surplus_router)
app.include_router(consumer_router)


@app.get("/seed", tags=["demo"])
def seed(db: Session = Depends(get_db)):
    # Create two farmers if none
    if db.query(Farmer).count() == 0:
        f1 = Farmer(name="Alice", location="Valley Farm", farm_size=25.5, wallet_address="0xALICE", tokens=0)
        f2 = Farmer(name="Bob", location="Hilltop Ranch", farm_size=40.0, wallet_address="0xBOB", tokens=0)
        db.add_all([f1, f2])
        db.commit()
        db.refresh(f1)
        db.refresh(f2)

    # Create two batches if none
    if db.query(FoodBatch).count() == 0:
        # Minimal batches; full creation logic (AI/QR/chain) happens in /batches/add normally
        b1 = FoodBatch(farmer_id=1, crop_type="wheat", quantity_kg=100, status="pending")
        b2 = FoodBatch(farmer_id=2, crop_type="vegetable", quantity_kg=50, status="pending")
        db.add_all([b1, b2])
        db.commit()

    return {
        "message": "Seed data ready",
        "farmers": db.query(Farmer).count(),
        "batches": db.query(FoodBatch).count(),
    }


# Run with: uvicorn main:app --reload



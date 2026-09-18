"""
NourishAI Platform - FastAPI Backend Server
Provides REST APIs for AI freshness vision scanner, kitchen demand forecaster,
live redistribution marketplace listings, zero-waste recipe generator, and ESG metrics.
"""

from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

from ai_engine import (
    predict_freshness_ai,
    forecast_demand_ai,
    generate_zero_waste_recipes,
    calculate_esg_impact,
    MOCK_LISTINGS,
    FOOD_SCANNER_SAMPLES
)

app = FastAPI(
    title="NourishAI - AI Food Waste Reduction & Redistribution API",
    description="High-performance AI engine & logistics backend for zero-waste food systems.",
    version="1.0.0"
)

# Enable CORS for local dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory listings database
listings_db = list(MOCK_LISTINGS)


# Request Models
class FreshnessRequest(BaseModel):
    sample_key: Optional[str] = None
    custom_notes: Optional[str] = None

class ForecastRequest(BaseModel):
    daily_covers: int = Field(200, ge=10, le=5000)
    day_of_week: str = "Friday"
    weather_condition: str = "Sunny"
    event_level: str = "None"

class RecipeRequest(BaseModel):
    ingredients: List[str] = Field(default_factory=list)

class CreateListingRequest(BaseModel):
    title: str
    donor_name: str
    donor_type: str = "Restaurant"
    category: str = "Prepared Meals"
    quantity: str
    urgency: str = "medium"
    expires_in_hours: float = 8.0
    dietary: List[str] = []
    address: str = "450 Mission St, San Francisco, CA"
    freshness_score: int = 90
    image: Optional[str] = None


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "NourishAI Backend Engine",
        "version": "1.0.0",
        "endpoints": [
            "/api/ai/predict-freshness",
            "/api/ai/demand-forecast",
            "/api/ai/generate-recipe",
            "/api/listings",
            "/api/esg/impact-report"
        ]
    }


@app.get("/api/ai/scanner-samples")
def get_scanner_samples():
    """Return list of preset food sample types for AI vision inspection demo."""
    return {"samples": FOOD_SCANNER_SAMPLES}


@app.post("/api/ai/predict-freshness")
def api_predict_freshness(req: FreshnessRequest):
    """AI Visual Freshness & Shelf-Life prediction endpoint."""
    result = predict_freshness_ai(sample_key=req.sample_key, custom_notes=req.custom_notes)
    return result


@app.post("/api/ai/demand-forecast")
def api_demand_forecast(req: ForecastRequest):
    """Predictive ML model for commercial kitchen waste prevention."""
    result = forecast_demand_ai(
        daily_covers=req.daily_covers,
        day_of_week=req.day_of_week,
        weather_condition=req.weather_condition,
        event_level=req.event_level
    )
    return result


@app.post("/api/ai/generate-recipe")
def api_generate_recipe(req: RecipeRequest):
    """Zero-waste recipe search and AI chef generation."""
    recipes = generate_zero_waste_recipes(pantry_items=req.ingredients)
    return {"recipes": recipes, "count": len(recipes)}


@app.get("/api/listings")
def get_listings(category: Optional[str] = None, urgency: Optional[str] = None):
    """Fetch active food rescue listings with optional filtering."""
    results = listings_db
    if category and category.lower() != "all":
        results = [item for item in results if item["category"].lower() == category.lower()]
    if urgency and urgency.lower() != "all":
        results = [item for item in results if item["urgency"].lower() == urgency.lower()]
    return {"listings": results, "total": len(results)}


@app.post("/api/listings")
def create_listing(req: CreateListingRequest):
    """Create a new surplus food rescue listing."""
    new_id = f"lst-{len(listings_db) + 101}"
    co2 = round(float(req.freshness_score) * 0.25, 1)
    
    new_item = {
        "id": new_id,
        "donor_name": req.donor_name,
        "donor_type": req.donor_type,
        "title": req.title,
        "category": req.category,
        "quantity": req.quantity,
        "urgency": req.urgency,
        "expires_in_hours": req.expires_in_hours,
        "dietary": req.dietary,
        "lat": 37.7749 + (len(listings_db) * 0.005),
        "lng": -122.4194 + (len(listings_db) * 0.004),
        "address": req.address,
        "freshness_score": req.freshness_score,
        "status": "Available",
        "co2_offset_kg": co2,
        "image": req.image or "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"
    }
    listings_db.insert(0, new_item)
    return {"success": True, "listing": new_item}


@app.post("/api/listings/{listing_id}/claim")
def claim_listing(listing_id: str, claimer_name: str = Query("Community Food Shelter")):
    """Claim a food donation for dispatch."""
    for item in listings_db:
        if item["id"] == listing_id:
            if item["status"] == "Claimed":
                raise HTTPException(status_code=400, detail="Listing already claimed.")
            item["status"] = "Claimed"
            item["claimed_by"] = claimer_name
            return {
                "success": True,
                "listing": item,
                "pickup_code": f"RESCUE-{listing_id.upper()}-PASS",
                "message": f"Successfully reserved! Please pick up within {item['expires_in_hours']} hours."
            }
    raise HTTPException(status_code=404, detail="Listing not found.")


@app.get("/api/esg/impact-report")
def get_esg_report():
    """Fetch ESG carbon offset and tax deduction metrics."""
    return calculate_esg_impact(donations_count=len(listings_db) + 138)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

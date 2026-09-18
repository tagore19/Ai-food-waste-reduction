"""
NourishAI Engine - Core Artificial Intelligence & Optimization Algorithms
Provides machine learning & rule-based inference for:
1. Freshness Score & Remaining Shelf Life Prediction
2. Commercial Kitchen Prep & Waste Reduction Demand Forecasting
3. Real-Time Redistribution Logistics & Priority Matching
4. Zero-Waste Culinary Recipe Generation
5. ESG Carbon Offset & Tax Exemption Analytics
"""

import math
import random
from typing import Dict, List, Any
from datetime import datetime, timedelta

# Sample food visual database for AI scanner simulation
FOOD_SCANNER_SAMPLES = {
    "organic_bananas": {
        "name": "Organic Cavendish Bananas",
        "category": "Produce",
        "default_freshness": 78,
        "hours_remaining": 44,
        "recommended_path": "Human Redistribution (Community Kitchens)",
        "discount_rate": 50,
        "co2_saved_per_kg": 1.2,
        "ai_analysis": "Minor sugar spots detected on 30% of surface area. Peel integrity intact. Optimal for immediate consumption or smoothie upcycling."
    },
    "artisanal_sourdough": {
        "name": "Artisanal Sourdough Loaves",
        "category": "Bakery",
        "default_freshness": 85,
        "hours_remaining": 28,
        "recommended_path": "Local Homeless Shelter / Food Bank",
        "discount_rate": 60,
        "co2_saved_per_kg": 0.9,
        "ai_analysis": "Crust firmness high, internal moisture 65%. High nutritional value. Priority rescue tier A (Human consumption within 24h)."
    },
    "catered_buffet_platters": {
        "name": "Catered Mediterranean Salad Platters",
        "category": "Prepared Meals",
        "default_freshness": 92,
        "hours_remaining": 8,
        "recommended_path": "Urgent Dispatch to Evening Shelter",
        "discount_rate": 75,
        "co2_saved_per_kg": 2.5,
        "ai_analysis": "Temperature recorded at 4.2°C (Cold Chain verified). High protein & fresh vegetable content. Requires expedited distribution before 10 PM."
    },
    "fresh_whole_milk": {
        "name": "Whole Organic Pasteurized Milk (20L)",
        "category": "Dairy",
        "default_freshness": 64,
        "hours_remaining": 36,
        "recommended_path": "Flash Discount / Food Bank",
        "discount_rate": 40,
        "co2_saved_per_kg": 3.1,
        "ai_analysis": "Sealed industrial jug. Expiry date code verified. Cold storage continuous log positive."
    },
    "overripe_tomatoes": {
        "name": "Roma Tomatoes (Bulk Lot)",
        "category": "Produce",
        "default_freshness": 42,
        "hours_remaining": 18,
        "recommended_path": "Upcycling (Artisanal Sauce / Composting)",
        "discount_rate": 80,
        "co2_saved_per_kg": 1.4,
        "ai_analysis": "Soft skin texture detected. High lycopene content. Recommended for processing into tomato puree or local farm animal feed."
    }
}

# Initial mock live listings
MOCK_LISTINGS = [
    {
        "id": "lst-101",
        "donor_name": "GreenBite Bistro",
        "donor_type": "Restaurant",
        "title": "Surplus Roasted Vegetable Bowls",
        "category": "Prepared Meals",
        "quantity": "18 Portions (9.0 kg)",
        "urgency": "high",
        "expires_in_hours": 3.5,
        "dietary": ["Vegetarian", "Gluten-Free", "Halal"],
        "lat": 37.7749,
        "lng": -122.4194,
        "address": "450 Mission St, San Francisco, CA",
        "freshness_score": 94,
        "status": "Available",
        "co2_offset_kg": 22.5,
        "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "lst-102",
        "donor_name": "Artisan Bakery & Cafe",
        "donor_type": "Bakery",
        "title": "Assorted Freshly Baked Artisanal Breads",
        "category": "Bakery",
        "quantity": "25 Loaves (12.5 kg)",
        "urgency": "medium",
        "expires_in_hours": 14.0,
        "dietary": ["Vegan"],
        "lat": 37.7833,
        "lng": -122.4167,
        "address": "880 Market St, San Francisco, CA",
        "freshness_score": 88,
        "status": "Available",
        "co2_offset_kg": 11.25,
        "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "lst-103",
        "donor_name": "Metro Fresh Supermarket",
        "donor_type": "Supermarket",
        "title": "Surplus Organic Strawberries & Berries",
        "category": "Produce",
        "quantity": "40 Crates (20.0 kg)",
        "urgency": "urgent",
        "expires_in_hours": 2.0,
        "dietary": ["Vegan", "Gluten-Free", "Organic"],
        "lat": 37.7650,
        "lng": -122.4200,
        "address": "1200 Valencia St, San Francisco, CA",
        "freshness_score": 76,
        "status": "Available",
        "co2_offset_kg": 24.0,
        "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "lst-104",
        "donor_name": "Grand View Hotel Catering",
        "donor_type": "Event Catering",
        "title": "Unserved Buffet Entrees & Rice Platters",
        "category": "Prepared Meals",
        "quantity": "35 Portions (17.5 kg)",
        "urgency": "medium",
        "expires_in_hours": 9.5,
        "dietary": ["Halal", "Contains Dairy"],
        "lat": 37.7900,
        "lng": -122.4000,
        "address": "500 Montgomery St, San Francisco, CA",
        "freshness_score": 91,
        "status": "Available",
        "co2_offset_kg": 43.75,
        "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"
    }
]

# Database for Zero Waste Recipes
RECIPE_DATABASE = [
    {
        "title": "Golden Banana & Stale Bread French Toast Bake",
        "ingredients_used": ["bananas", "bread", "milk", "eggs"],
        "prep_time": "20 mins",
        "waste_reduction_tier": "High Impact",
        "instructions": [
            "Slice stale bread into 1-inch cubes and layer in a baking dish.",
            "Whisk milk, eggs, cinnamon, and mashed overripe bananas until smooth.",
            "Pour mixture over bread cubes and let absorb for 10 minutes.",
            "Bake at 180°C (350°F) for 25 minutes until golden brown and caramelized."
        ],
        "nutrition_per_serving": "320 kcal, 9g Protein, 4g Fiber"
    },
    {
        "title": "Rich Vegetable Peel & Herb Umami Broth",
        "ingredients_used": ["carrots", "onion", "celery", "herbs", "tomatoes"],
        "prep_time": "45 mins",
        "waste_reduction_tier": "Zero-Waste Master",
        "instructions": [
            "Collect washed carrot peels, onion skins, celery tops, and herb stems.",
            "Sauté scraps in olive oil for 5 minutes to release aromatic compounds.",
            "Cover with 2 liters of water, add bay leaf and peppercorns.",
            "Simmer on low heat for 40 minutes, strain liquid into airtight glass jars."
        ],
        "nutrition_per_serving": "45 kcal, Rich in Electrolytes & Minerals"
    },
    {
        "title": "Crispy Stale Pita Chips with Roasted Tomato Dip",
        "ingredients_used": ["pita bread", "tomatoes", "garlic", "olive oil"],
        "prep_time": "15 mins",
        "waste_reduction_tier": "Quick Snack",
        "instructions": [
            "Cut dry pita bread into triangular chips.",
            "Toss with olive oil, garlic powder, salt, and za'atar.",
            "Bake at 200°C for 8-10 minutes until crunchy.",
            "Blend soft overripe tomatoes with garlic and olive oil for a fresh dip."
        ],
        "nutrition_per_serving": "210 kcal, 5g Protein"
    }
]


def predict_freshness_ai(sample_key: str = None, custom_notes: str = None) -> Dict[str, Any]:
    """
    Simulates AI Visual & Sensor Inspection for food freshness scoring.
    """
    if sample_key in FOOD_SCANNER_SAMPLES:
        base = FOOD_SCANNER_SAMPLES[sample_key]
        freshness = base["default_freshness"] + random.randint(-3, 3)
        hours = base["hours_remaining"] + random.randint(-1, 2)
        return {
            "success": True,
            "item_name": base["name"],
            "category": base["category"],
            "freshness_score": max(10, min(99, freshness)),
            "hours_remaining": max(1, hours),
            "recommended_action": base["recommended_path"],
            "discount_percentage": base["discount_rate"],
            "co2_saved_per_kg": base["co2_saved_per_kg"],
            "ai_vision_analysis": base["ai_analysis"],
            "timestamp": datetime.now().isoformat()
        }
    
    # Custom analysis fallback
    item_title = custom_notes if custom_notes else "Scanned Food Sample"
    freshness = random.randint(65, 95)
    hours = round(freshness * 0.5, 1)
    return {
        "success": True,
        "item_name": item_title,
        "category": "General Pantry",
        "freshness_score": freshness,
        "hours_remaining": hours,
        "recommended_action": "Human Redistribution (Shelter Match)",
        "discount_percentage": 50,
        "co2_saved_per_kg": 1.8,
        "ai_vision_analysis": "Visual scan indicates good structural integrity. Mild discoloration on surface layer. Suitable for rescue.",
        "timestamp": datetime.now().isoformat()
    }


def forecast_demand_ai(daily_covers: int, day_of_week: str, weather_condition: str, event_level: str) -> Dict[str, Any]:
    """
    Predictive ML model for commercial kitchen prep optimization.
    Reduces pre-consumer food waste by calculating exact ingredient prep bounds.
    """
    # Baseline multiplier based on day
    day_multipliers = {
        "Monday": 0.85, "Tuesday": 0.88, "Wednesday": 0.92,
        "Thursday": 1.05, "Friday": 1.30, "Saturday": 1.45, "Sunday": 1.15
    }
    
    # Weather multiplier
    weather_multipliers = {
        "Sunny": 1.10, "Rainy": 0.82, "Cloudy": 0.98, "Heatwave": 0.90
    }
    
    # Event scale multiplier
    event_multipliers = {
        "None": 1.00, "Local Festival": 1.25, "Concert/Sports": 1.40, "Holiday Weekend": 1.35
    }
    
    d_mult = day_multipliers.get(day_of_week, 1.0)
    w_mult = weather_multipliers.get(weather_condition, 1.0)
    e_mult = event_multipliers.get(event_level, 1.0)
    
    # Target demand calculation
    predicted_covers = int(daily_covers * d_mult * w_mult * e_mult)
    
    # Historical unguided over-prep (average 22% excess food prepared)
    traditional_prep_kg = round(predicted_covers * 0.75 * 1.22, 1)
    ai_optimized_prep_kg = round(predicted_covers * 0.75 * 1.04, 1)
    
    waste_prevented_kg = round(traditional_prep_kg - ai_optimized_prep_kg, 1)
    cost_saved_usd = round(waste_prevented_kg * 8.50, 2)
    co2_prevented_kg = round(waste_prevented_kg * 2.4, 1)
    
    return {
        "predicted_customer_covers": predicted_covers,
        "traditional_prep_kg": traditional_prep_kg,
        "ai_optimized_prep_kg": ai_optimized_prep_kg,
        "projected_waste_prevented_kg": waste_prevented_kg,
        "projected_cost_savings_usd": cost_saved_usd,
        "projected_co2_avoided_kg": co2_prevented_kg,
        "confidence_score": "94.2%",
        "kitchen_actionable_recommendations": [
            f"Reduce raw protein defrost target by {round(waste_prevented_kg * 0.4, 1)} kg for {day_of_week}.",
            f"Pre-chop produce in smaller batches at 11:30 AM and 5:30 PM rather than all morning.",
            f"Expected peak dining window: 12:30 PM - 2:00 PM and 7:00 PM - 8:45 PM."
        ]
    }


def generate_zero_waste_recipes(pantry_items: List[str]) -> List[Dict[str, Any]]:
    """
    Finds or generates zero-waste culinary recipes from input ingredient list.
    """
    pantry_lower = [item.lower().strip() for item in pantry_items]
    matched = []
    
    for recipe in RECIPE_DATABASE:
        score = sum(1 for ing in recipe["ingredients_used"] if any(p in ing or ing in p for p in pantry_lower))
        if score > 0 or len(pantry_lower) == 0:
            matched.append(recipe)
            
    if not matched:
        # Generate custom AI recipe on the fly
        items_str = ", ".join(pantry_lower[:4]) if pantry_lower else "assorted kitchen leftovers"
        matched.append({
            "title": f"Creative Zero-Waste {items_str.capitalize()} Stir-Fry",
            "ingredients_used": pantry_lower,
            "prep_time": "15 mins",
            "waste_reduction_tier": "Custom AI Chef Creation",
            "instructions": [
                f"Prepare {items_str} by slicing into uniform bites.",
                "Heat 1 tbsp oil in a hot skillet with garlic and ginger.",
                "Sauté hard vegetables first, followed by softer ingredients.",
                "Season with soy sauce, sesame oil, and red pepper flakes."
            ],
            "nutrition_per_serving": "280 kcal, High Fiber"
        })
        
    return matched


def calculate_esg_impact(donations_count: int = 142) -> Dict[str, Any]:
    """
    Calculates platform-wide or organization-specific ESG metrics.
    """
    total_meals_saved = donations_count * 28
    total_food_kg = round(total_meals_saved * 0.45, 1)
    co2_offset_tons = round((total_food_kg * 2.5) / 1000.0, 2)
    water_saved_gallons = int(total_food_kg * 180)
    tax_deduction_usd = round(total_food_kg * 4.25, 2)
    
    return {
        "total_donations_processed": donations_count,
        "total_meals_saved": total_meals_saved,
        "total_food_rescued_kg": total_food_kg,
        "co2_offset_metric_tons": co2_offset_tons,
        "water_saved_gallons": water_saved_gallons,
        "estimated_tax_deduction_usd": tax_deduction_usd,
        "certificate_id": f"ESG-FOOD-{random.randint(100000, 999999)}",
        "verification_hash": f"0x{random.getrandbits(64):016x}"
    }

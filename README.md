# 🌿 NourishAI - AI-Powered Food Waste Reduction & Redistribution Platform

> An all-in-one full-stack platform leveraging Artificial Intelligence, Computer Vision, and Predictive Logistics to eliminate commercial & household food waste, connect surplus donors with shelters, and generate corporate ESG carbon reports.

---

## 🚀 Key Features

* **🔍 AI Vision & Freshness Inspector**: Analyzes food ripeness, estimates remaining shelf-life (hours countdown), and calculates optimal rescue disposition (Human Donation vs. Flash Discount vs. Upcycling/Composting).
* **🗺️ Real-Time Redistribution Hub & Map**: Live marketplace connecting food donors (restaurants, hotels, bakeries, supermarkets) with community beneficiaries (food banks, shelters), featuring digital QR pickup pass generation.
* **📊 AI Kitchen Demand & Prep Forecaster**: Predictive ML model for commercial kitchens to optimize daily prep bounds based on covers, weather forecasts, and local event traffic—preventing pre-consumer waste by up to 85%.
* **👨‍🍳 Zero-Waste AI Chef & Recipe Assistant**: Household food rescue tool that turns fridge/pantry leftovers into delicious gourmet recipes with step-by-step cooking instructions.
* **🏆 ESG Carbon Offset & Tax Exemption Center**: Tracks platform-wide CO2 metric tons offset, water saved, and generates IRS-compliant tax deduction certificates for corporate donors.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite, Custom OKLCH/OKLAB Glassmorphism CSS, Lucide React Icons, Canvas Confetti.
* **Backend**: Python 3.9+, FastAPI, Uvicorn ASGI, Pydantic v2.

---

## 💻 Prerequisites (What you need installed)

Before installing NourishAI, make sure your computer has:

1. **Node.js** (v18.0 or higher) - [Download Node.js](https://nodejs.org/)
2. **Python** (v3.9 or higher) - [Download Python](https://www.python.org/)
3. **Git** - [Download Git](https://git-scm.com/)

---

## 📦 Step-by-Step Installation & Setup Guide

### 1. Clone or Download the Project

Open your Terminal / Command Prompt and run:

```bash
git clone https://github.com/tagore19/Ai-food-waste-reduction.git
cd Ai-food-waste-reduction
```

---

### 2. Set Up the Python Backend

Open a terminal inside the project directory and run:

#### **On Windows (Command Prompt / PowerShell):**
```bash
# Navigate to backend folder
cd backend

# Install required Python packages
pip install -r requirements.txt

# Start the Python FastAPI server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

#### **On macOS / Linux:**
```bash
# Navigate to backend folder
cd backend

# Install required Python packages
pip3 install -r requirements.txt

# Start the Python FastAPI server
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

*The backend API server will start running at:* `http://127.0.0.1:8000`  
*API Documentation (Swagger UI):* `http://127.0.0.1:8000/docs`

---

### 3. Set Up the React Frontend

Open a **new terminal window/tab** in the root project directory (`Ai-food-waste-reduction`) and run:

```bash
# Install Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```

*The frontend web application will start running at:* `http://localhost:5173/`

---

## 📂 Project Structure

```text
Ai-food-waste-reduction/
├── backend/
│   ├── main.py              # FastAPI server & REST API endpoints
│   ├── ai_engine.py         # AI algorithms (Freshness, Demand, Matching, ESG)
│   └── requirements.txt     # Python backend dependencies
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top navigation bar & live status indicator
│   │   ├── HeroSection.jsx      # Hero banner, stats counter, live AI ticker
│   │   ├── FreshnessScanner.jsx # Computer vision freshness inspector tool
│   │   ├── RedistributionHub.jsx# Food marketplace & interactive map view
│   │   ├── DemandForecaster.jsx # Kitchen demand & prep calculator
│   │   ├── RecipeAssistant.jsx  # Zero-waste AI recipe generator
│   │   ├── EsgDashboard.jsx     # ESG carbon offset metrics & certificate
│   │   ├── ClaimModal.jsx       # QR pickup pass generation modal
│   │   ├── NewListingModal.jsx  # Modal for posting food surplus listings
│   │   └── ErrorBoundary.jsx    # React error boundary component
│   ├── App.jsx              # Main React application shell
│   ├── main.jsx             # React DOM root entry
│   └── index.css            # Glassmorphism design system & CSS variables
├── index.html               # Main HTML document & Google Fonts
├── vite.config.js           # Vite dev server & API proxy config
└── package.json             # Frontend dependencies & scripts
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Backend health check & system info |
| `POST` | `/api/ai/predict-freshness` | Visual freshness inspection & shelf life |
| `POST` | `/api/ai/demand-forecast` | Kitchen prep target & waste reduction model |
| `POST` | `/api/ai/generate-recipe` | Zero-waste recipe generator |
| `GET` | `/api/listings` | Fetch active surplus food listings |
| `POST` | `/api/listings` | Create a new surplus food donation |
| `POST` | `/api/listings/{id}/claim` | Reserve surplus allotment & issue QR pass |
| `GET` | `/api/esg/impact-report` | Fetch ESG metrics & certificate details |

---

## ❓ Troubleshooting & FAQs

#### **Q: What if Port 8000 or 5173 is already in use?**
- To run the backend on a different port (e.g. 8001):
  ```bash
  python -m uvicorn main:app --host 127.0.0.1 --port 8001
  ```
  Then update the proxy target in `vite.config.js` to point to port `8001`.

#### **Q: What if Python command is not recognized?**
- Make sure Python is added to your System PATH environment variables during installation. Try running `python3` or `py` instead of `python`.

#### **Q: Can I run this without the Python backend?**
- Yes! The React frontend includes built-in offline client simulation fallbacks so you can test all features even if the backend is stopped.

---

## 📄 License & Attribution

Distributed under the MIT License. Built for zero-waste sustainability & AI food security initiatives.

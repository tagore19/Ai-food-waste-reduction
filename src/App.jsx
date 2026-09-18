import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FreshnessScanner from './components/FreshnessScanner';
import RedistributionHub from './components/RedistributionHub';
import DemandForecaster from './components/DemandForecaster';
import RecipeAssistant from './components/RecipeAssistant';
import EsgDashboard from './components/EsgDashboard';
import ClaimModal from './components/ClaimModal';
import NewListingModal from './components/NewListingModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');
  const [backendStatus, setBackendStatus] = useState(false);
  const [listings, setListings] = useState([
    {
      id: "lst-101",
      donor_name: "GreenBite Bistro",
      donor_type: "Restaurant",
      title: "Surplus Roasted Vegetable Bowls",
      category: "Prepared Meals",
      quantity: "18 Portions (9.0 kg)",
      urgency: "high",
      expires_in_hours: 3.5,
      dietary: ["Vegetarian", "Gluten-Free", "Halal"],
      lat: 37.7749,
      lng: -122.4194,
      address: "450 Mission St, San Francisco, CA",
      freshness_score: 94,
      status: "Available",
      co2_offset_kg: 22.5,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "lst-102",
      donor_name: "Artisan Bakery & Cafe",
      donor_type: "Bakery",
      title: "Assorted Freshly Baked Artisanal Breads",
      category: "Bakery",
      quantity: "25 Loaves (12.5 kg)",
      urgency: "medium",
      expires_in_hours: 14.0,
      dietary: ["Vegan"],
      lat: 37.7833,
      lng: -122.4167,
      address: "880 Market St, San Francisco, CA",
      freshness_score: 88,
      status: "Available",
      co2_offset_kg: 11.25,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "lst-103",
      donor_name: "Metro Fresh Supermarket",
      donor_type: "Supermarket",
      title: "Surplus Organic Strawberries & Berries",
      category: "Produce",
      quantity: "40 Crates (20.0 kg)",
      urgency: "urgent",
      expires_in_hours: 2.0,
      dietary: ["Vegan", "Gluten-Free", "Organic"],
      lat: 37.7650,
      lng: -122.4200,
      address: "1200 Valencia St, San Francisco, CA",
      freshness_score: 76,
      status: "Available",
      co2_offset_kg: 24.0,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "lst-104",
      donor_name: "Grand View Hotel Catering",
      donor_type: "Event Catering",
      title: "Unserved Buffet Entrees & Rice Platters",
      category: "Prepared Meals",
      quantity: "35 Portions (17.5 kg)",
      urgency: "medium",
      expires_in_hours: 9.5,
      dietary: ["Halal", "Contains Dairy"],
      lat: 37.7900,
      lng: -122.4000,
      address: "500 Montgomery St, San Francisco, CA",
      freshness_score: 91,
      status: "Available",
      co2_offset_kg: 43.75,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"
    }
  ]);

  const [selectedClaimListing, setSelectedClaimListing] = useState(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState(false);
  const [scannerPrefill, setScannerPrefill] = useState(null);

  // Poll backend health status
  useEffect(() => {
    fetch('/api/listings')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API offline');
      })
      .then((data) => {
        setBackendStatus(true);
        if (data.listings && data.listings.length > 0) {
          setListings(data.listings);
        }
      })
      .catch(() => {
        setBackendStatus(false);
      });
  }, []);

  const handleCreateListing = async (newListingData) => {
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListingData)
      });
      if (res.ok) {
        const data = await res.json();
        setListings([data.listing, ...listings]);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      const newItem = {
        id: `lst-${Date.now()}`,
        ...newListingData,
        status: 'Available',
        co2_offset_kg: 18.5,
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"
      };
      setListings([newItem, ...listings]);
    }
    setActiveTab('hub');
  };

  const handleConfirmClaim = (listingId, claimerName) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === listingId
          ? { ...item, status: 'Claimed', claimed_by: claimerName }
          : item
      )
    );
  };

  const handlePublishFromScanner = (scannerData) => {
    setScannerPrefill(scannerData);
    setIsNewListingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        backendStatus={backendStatus}
        onOpenNewListing={() => setIsNewListingOpen(true)}
      />

      {/* Hero Header Section */}
      <HeroSection 
        onExploreScanner={() => setActiveTab('scanner')} 
        onExploreHub={() => setActiveTab('hub')} 
      />

      {/* Main Tabbed Views */}
      <main style={{ flex: 1 }}>
        {activeTab === 'scanner' && (
          <FreshnessScanner onPublishListing={handlePublishFromScanner} />
        )}

        {activeTab === 'hub' && (
          <RedistributionHub 
            listings={listings} 
            onSelectClaim={(item) => setSelectedClaimListing(item)} 
          />
        )}

        {activeTab === 'forecaster' && (
          <DemandForecaster />
        )}

        {activeTab === 'recipe' && (
          <RecipeAssistant />
        )}

        {activeTab === 'esg' && (
          <EsgDashboard />
        )}
      </main>

      {/* Modals */}
      {selectedClaimListing && (
        <ClaimModal 
          listing={selectedClaimListing} 
          onClose={() => setSelectedClaimListing(null)}
          onConfirmClaim={handleConfirmClaim}
        />
      )}

      {isNewListingOpen && (
        <NewListingModal 
          onClose={() => { setIsNewListingOpen(false); setScannerPrefill(null); }}
          onCreateListing={handleCreateListing}
          initialData={scannerPrefill}
        />
      )}

      {/* Footer */}
      <footer className="glass-panel" style={{ margin: '2rem 1.5rem 1.5rem 1.5rem', padding: '1.25rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>NourishAI</strong> • Empowering Sustainable Zero-Waste Food Networks with Artificial Intelligence
          </div>
          <div>
            FastAPI Backend • React 18 UI • OKLCH OKLAB Visual System
          </div>
        </div>
      </footer>

    </div>
  );
}

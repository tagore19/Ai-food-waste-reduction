import React from 'react';
import { Leaf, Cpu, MapPin, BarChart3, Utensils, Award, PlusCircle } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, backendStatus, onOpenNewListing }) {
  return (
    <header className="glass-panel" style={{ margin: '1rem 1.5rem', padding: '0.85rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo & Live Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            <Leaf size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Nourish<span className="text-gradient">AI</span></h1>
              <span className="badge badge-medium" style={{ fontSize: '0.7rem', textTransform: 'none' }}>
                <span className="ai-pulse-dot" /> {backendStatus ? 'Live API Connected' : 'Client Mode'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI Food Rescue & Redistribution Network</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
          <button 
            className={`nav-tab ${activeTab === 'scanner' ? 'active' : ''}`}
            onClick={() => setActiveTab('scanner')}
          >
            <Cpu size={18} /> AI Vision Scanner
          </button>
          
          <button 
            className={`nav-tab ${activeTab === 'hub' ? 'active' : ''}`}
            onClick={() => setActiveTab('hub')}
          >
            <MapPin size={18} /> Rescue Hub & Map
          </button>
          
          <button 
            className={`nav-tab ${activeTab === 'forecaster' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecaster')}
          >
            <BarChart3 size={18} /> Demand Predictor
          </button>

          <button 
            className={`nav-tab ${activeTab === 'recipe' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipe')}
          >
            <Utensils size={18} /> Zero-Waste Chef
          </button>

          <button 
            className={`nav-tab ${activeTab === 'esg' ? 'active' : ''}`}
            onClick={() => setActiveTab('esg')}
          >
            <Award size={18} /> ESG Analytics
          </button>
        </nav>

        {/* Action Button */}
        <div>
          <button className="btn-primary" onClick={onOpenNewListing}>
            <PlusCircle size={18} /> Donate Surplus Food
          </button>
        </div>

      </div>
    </header>
  );
}

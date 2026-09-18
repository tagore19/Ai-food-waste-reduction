import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, Scale, DollarSign, ArrowRight, Utensils } from 'lucide-react';

export default function HeroSection({ onExploreScanner, onExploreHub }) {
  const [mealsCount, setMealsCount] = useState(48290);
  const [co2Tons, setCo2Tons] = useState(112.4);

  // Live simulation ticker messages
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickerEvents = [
    "🟢 AI Match: GreenBite Bistro donated 18 portions of salad to St. Jude Shelter (Pickup in 30 mins)",
    "⚡ High Priority: Metro Fresh Supermarket listed 20kg Organic Strawberries (Urgent 2h window)",
    "🌱 Demand Forecaster saved Grand View Catering 14.2 kg of prep waste today",
    "🚚 Volunteer Driver #402 en route to pick up 25 artisanal sourdough loaves from Artisan Bakery",
    "✨ ESG Certificate issued: 1.45 Metric Tons CO2 offset by SF Hospitality Alliance"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerEvents.length);
      setMealsCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
      setCo2Tons((prev) => parseFloat((prev + 0.05).toFixed(2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ margin: '0 1.5rem 2rem 1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Main Hero Copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.35rem 0.85rem', borderRadius: '9999px', marginBottom: '1.25rem' }}>
              <Sparkles size={16} color="#34d399" />
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#34d399' }}>AI-Powered Zero Waste Logistics</span>
            </div>

            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.15', marginBottom: '1rem' }}>
              Eliminate Food Waste. <br />
              <span className="text-gradient">Feed Communities in Real Time.</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.75rem', maxWidth: '580px' }}>
              NourishAI connects restaurants, grocers, and caterers with local shelters using visual freshness prediction, predictive demand forecasting, and automated route dispatching.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={onExploreScanner}>
                Test AI Freshness Scanner <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={onExploreHub}>
                View Live Map & Listings
              </button>
            </div>
          </div>

          {/* Stats & Live Ticker Panel */}
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              
              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-emerald)', marginBottom: '0.5rem' }}>
                  <Utensils size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Meals Rescued</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>
                  {mealsCount.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#34d399' }}>+124 meals today</div>
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                  <Scale size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>CO2 Offset</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>
                  {co2Tons} <span style={{ fontSize: '1rem', fontWeight: '600' }}>Tons</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24' }}>Verified carbon credits</div>
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                  <Truck size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Active Rescue Dispatch</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>
                  14 <span style={{ fontSize: '1rem', fontWeight: '600' }}>Vehicles</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Avg pickup time 22 mins</div>
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa', marginBottom: '0.5rem' }}>
                  <DollarSign size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Business Savings</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>
                  $184.2K
                </div>
                <div style={{ fontSize: '0.75rem', color: '#c084fc' }}>Tax write-off value</div>
              </div>

            </div>

            {/* Live Ticker Bar */}
            <div style={{
              background: 'rgba(5, 20, 14, 0.8)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.85rem'
            }}>
              <span className="ai-pulse-dot" />
              <span style={{ fontWeight: '700', color: 'var(--primary-emerald)', whiteSpace: 'nowrap' }}>LIVE AI NETWORK:</span>
              <div style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {tickerEvents[tickerIndex]}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

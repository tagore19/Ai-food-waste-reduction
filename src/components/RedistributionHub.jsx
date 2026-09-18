import React, { useState } from 'react';
import { MapPin, Filter, Clock, AlertTriangle, ShieldCheck, HeartHandshake, Search, ExternalLink } from 'lucide-react';

export default function RedistributionHub({ listings, onSelectClaim }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  const categories = ['All', 'Prepared Meals', 'Bakery', 'Produce', 'Dairy'];
  const urgencies = ['All', 'urgent', 'high', 'medium'];

  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesUrgency = selectedUrgency === 'All' || item.urgency.toLowerCase() === selectedUrgency.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.donor_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesUrgency && matchesSearch;
  });

  return (
    <section style={{ margin: '0 1.5rem 2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <MapPin color="#10b981" size={24} />
            <h3 style={{ fontSize: '1.6rem' }}>Live Surplus Food Redistribution Hub</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>
            Real-time rescue feed connecting registered donors with food banks, shelters, and community kitchens.
          </p>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: viewMode === 'grid' ? 'var(--primary-emerald)' : 'transparent',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            List View ({filteredListings.length})
          </button>
          <button
            onClick={() => setViewMode('map')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: viewMode === 'map' ? 'var(--primary-emerald)' : 'transparent',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Interactive Map
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', minWidth: '260px', flex: '1' }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text"
            placeholder="Search by food type, bakery, restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '600',
                border: `1px solid ${selectedCategory === cat ? 'var(--primary-emerald)' : 'rgba(255,255,255,0.1)'}`,
                background: selectedCategory === cat ? 'rgba(16,185,129,0.2)' : 'transparent',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Content View: Grid or Map */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredListings.map((item) => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Image & Urgency Banner */}
                <div style={{ position: 'relative', height: '160px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1rem' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                    <span className={`badge badge-${item.urgency}`}>
                      <Clock size={12} /> {item.expires_in_hours}h left
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.75)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#34d399' }}>
                    {item.freshness_score}% Fresh
                  </div>
                </div>

                {/* Donor & Title */}
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {item.donor_name} • <span style={{ color: 'var(--primary-emerald)' }}>{item.donor_type}</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{item.title}</h4>

                {/* Details */}
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  <div><strong>Quantity:</strong> {item.quantity}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                    <MapPin size={14} color="#34d399" /> {item.address}
                  </div>
                </div>

                {/* Dietary Badges */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {item.dietary.map((tag, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', opacity: item.status === 'Claimed' ? 0.6 : 1 }}
                disabled={item.status === 'Claimed'}
                onClick={() => onSelectClaim(item)}
              >
                <HeartHandshake size={18} /> {item.status === 'Claimed' ? `Reserved by ${item.claimed_by || 'Shelter'}` : 'Claim Food Donation'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Simulated Logistics Map View */
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1.1rem' }}>Live Dispatch & Route Matrix</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🟢 4 Volunteer Vehicles En Route</span>
          </div>

          <div style={{
            height: '420px',
            background: '#04100b',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Grid graphic lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(52, 211, 153, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />

            {/* Map Pins Simulation */}
            {filteredListings.map((item, index) => {
              const offsets = [
                { top: '25%', left: '30%' },
                { top: '45%', left: '60%' },
                { top: '70%', left: '35%' },
                { top: '35%', left: '75%' }
              ];
              const pos = offsets[index % offsets.length];

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectClaim(item)}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    cursor: 'pointer',
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.2s ease',
                    zIndex: 10
                  }}
                  title={item.title}
                >
                  <div style={{
                    background: item.urgency === 'urgent' ? '#ef4444' : '#10b981',
                    color: '#fff',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    boxShadow: '0 0 20px rgba(16,185,129,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <MapPin size={14} /> {item.donor_name} ({item.quantity})
                  </div>
                </div>
              );
            })}

            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Click any donor pin on the map to claim food allotment.
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

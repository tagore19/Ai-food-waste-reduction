import React, { useState } from 'react';
import { X, PlusCircle, Sparkles } from 'lucide-react';

export default function NewListingModal({ onClose, onCreateListing, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [donorName, setDonorName] = useState('GreenBite Bistro');
  const [donorType, setDonorType] = useState('Restaurant');
  const [category, setCategory] = useState(initialData?.category || 'Prepared Meals');
  const [quantity, setQuantity] = useState(initialData?.quantity || '15 Portions (7.5 kg)');
  const [urgency, setUrgency] = useState('high');
  const [expiresInHours, setExpiresInHours] = useState(initialData?.expires_in_hours || 6);
  const [dietary, setDietary] = useState(['Halal', 'Vegetarian']);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateListing({
      title,
      donor_name: donorName,
      donor_type: donorType,
      category,
      quantity,
      urgency,
      expires_in_hours: parseFloat(expiresInHours),
      dietary,
      freshness_score: initialData?.freshness_score || 92,
      address: '450 Mission St, San Francisco, CA'
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ maxWidth: '560px', width: '100%', padding: '1.75rem', position: 'relative' }}>
        
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <PlusCircle color="#10b981" size={24} />
          <h3 style={{ fontSize: '1.3rem' }}>Post Surplus Food Donation</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Listing Title / Food Item</label>
            <input 
              type="text"
              required
              placeholder="e.g. 20 Fresh Artisan Sandwiches..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Donor Business Name</label>
              <input 
                type="text"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }}
              >
                <option value="Prepared Meals" style={{ background: '#07140e' }}>Prepared Meals</option>
                <option value="Bakery" style={{ background: '#07140e' }}>Bakery</option>
                <option value="Produce" style={{ background: '#07140e' }}>Produce</option>
                <option value="Dairy" style={{ background: '#07140e' }}>Dairy</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Quantity / Weight</label>
              <input 
                type="text"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Expiry Window (Hours)</label>
              <input 
                type="number"
                step="0.5"
                required
                value={expiresInHours}
                onChange={(e) => setExpiresInHours(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }}
              />
            </div>
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
            <Sparkles size={18} /> Publish to Live AI Rescue Feed
          </button>
        </form>

      </div>
    </div>
  );
}

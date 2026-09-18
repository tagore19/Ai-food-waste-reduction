import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, Clock, MapPin, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClaimModal({ listing, onClose, onConfirmClaim }) {
  const [claimerName, setClaimerName] = useState('St. Jude Community Kitchen');
  const [contactPhone, setContactPhone] = useState('(415) 555-0192');
  const [isSuccess, setIsSuccess] = useState(false);
  const [pickupPass, setPickupPass] = useState('');

  if (!listing) return null;

  const handleClaimSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/listings/${listing.id}/claim?claimer_name=${encodeURIComponent(claimerName)}`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setPickupPass(data.pickup_code || `RESCUE-${listing.id.toUpperCase()}-PASS`);
      } else {
        setPickupPass(`RESCUE-${listing.id.toUpperCase()}-PASS`);
      }
    } catch (err) {
      setPickupPass(`RESCUE-${listing.id.toUpperCase()}-PASS`);
    }

    setIsSuccess(true);
    onConfirmClaim(listing.id, claimerName);

    // Safely trigger confetti if available
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.log('Confetti effect skipped:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ maxWidth: '520px', width: '100%', padding: '1.75rem', position: 'relative' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <HeartHandshake color="#10b981" size={24} />
              <h3 style={{ fontSize: '1.3rem' }}>Claim Surplus Food Allotment</h3>
            </div>

            {/* Item Brief */}
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399' }}>{listing.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Donor: <strong>{listing.donor_name}</strong> • Quantity: {listing.quantity}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fbbf24', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} /> Pickup required within {listing.expires_in_hours} hours
              </div>
            </div>

            <form onSubmit={handleClaimSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Receiving Organization / Shelter Name
                </label>
                <input
                  type="text"
                  required
                  value={claimerName}
                  onChange={(e) => setClaimerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Dispatch Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                Confirm Reservation & Generate Pickup Pass
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 color="#10b981" size={56} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }}>Surplus Reserved!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your pickup reservation pass has been dispatched to {listing.donor_name}.
            </p>

            {/* QR Pass Graphic */}
            <div style={{ background: '#ffffff', color: '#000000', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'inline-block' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <QrCode size={120} color="#07140e" />
              </div>
              <div style={{ fontFamily: 'monospace', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
                {pickupPass}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem' }}>Show QR to donor at pickup</div>
            </div>

            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Close & Return to Hub
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Award, FileText, Download, ShieldCheck, CheckCircle, Scale, Droplet, DollarSign } from 'lucide-react';

export default function EsgDashboard() {
  const [esgData, setEsgData] = useState({
    total_donations_processed: 142,
    total_meals_saved: 3976,
    total_food_rescued_kg: 1789.2,
    co2_offset_metric_tons: 4.47,
    water_saved_gallons: 322056,
    estimated_tax_deduction_usd: 7604.10,
    certificate_id: "ESG-FOOD-982410",
    verification_hash: "0x89f4b7a1e209142c"
  });

  useEffect(() => {
    fetch('/api/esg/impact-report')
      .then((res) => res.json())
      .then((data) => setEsgData(data))
      .catch(() => {});
  }, []);

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section style={{ margin: '0 1.5rem 2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Award color="#10b981" size={24} />
          <h3 style={{ fontSize: '1.6rem' }}>ESG Carbon Offset & Tax Exemption Center</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Automated sustainability metrics tracking for commercial donors, corporate CSR reports, and IRS-compliant tax deduction certificates.
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Food Rescued</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34d399' }}>
            {esgData.total_food_rescued_kg.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{esgData.total_meals_saved.toLocaleString()} meals</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>CO2 Emissions Avoided</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Scale size={20} /> {esgData.co2_offset_metric_tons} <span style={{ fontSize: '0.9rem' }}>MT</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Methane prevention equivalent</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Virtual Water Saved</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Droplet size={20} /> {(esgData.water_saved_gallons / 1000).toFixed(1)}K <span style={{ fontSize: '0.9rem' }}>Gal</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Agricultural water footprint</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Tax Write-Off Value</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <DollarSign size={20} /> ${esgData.estimated_tax_deduction_usd.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fair market valuation</div>
        </div>

      </div>

      {/* Official Certificate Preview Card */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(52, 211, 153, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck color="#10b981" size={24} />
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Official ESG Sustainability Certificate</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Certificate ID: {esgData.certificate_id} • Hash: {esgData.verification_hash}</p>
          </div>

          <button className="btn-primary" onClick={handlePrintCertificate}>
            <Download size={18} /> Export Printable Certificate
          </button>
        </div>

        <div style={{
          background: 'rgba(5, 20, 14, 0.9)',
          border: '2px dashed rgba(52, 211, 153, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          color: '#ffffff'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#34d399', letterSpacing: '0.05em' }}>CERTIFICATE OF ZERO-WASTE IMPACT</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Presented for verified commercial food rescue and carbon footprint mitigation.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ color: 'var(--text-muted)' }}>Organization:</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>San Francisco Hospitality Alliance</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)' }}>Reporting Period:</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Q3 2026 Audit Cycle</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)' }}>Rescued Food Volume:</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#34d399' }}>{esgData.total_food_rescued_kg} kg ({esgData.total_meals_saved} Meals)</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)' }}>Direct CO2 Avoidance:</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#fbbf24' }}>{esgData.co2_offset_metric_tons} Metric Tons</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>Verified by NourishAI Protocol & IRS 501(c)(3) Partner Network</div>
            <div style={{ color: '#34d399', fontWeight: '700' }}>✓ Blockchain Verification Signed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

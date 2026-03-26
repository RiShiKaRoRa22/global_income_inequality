'use client';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!user) router.push('/login'); }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Live Data
        </span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3rem', marginTop: '1rem', marginBottom: '0.75rem' }}>
          Power BI Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '520px' }}>
          Interactive global income inequality visualisation. Use the embedded dashboard
          to explore filters, drill-downs, and cross-country comparisons.
        </p>
      </div>

      {/* Info strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        padding: '1.25rem 2rem',
        background: 'var(--navy-800)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {[
          ['Source', 'World Bank, OECD, UN'],
          ['Coverage', '186 countries'],
          ['Updated', '2024'],
          ['Metric', 'Gini Coefficient'],
        ].map(([label, val]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{val}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <span style={{ color: 'var(--accent)', fontSize: '0.78rem' }}>Live embed</span>
        </div>
      </div>

      {/* Power BI iframe */}
      <div style={{
        background: 'var(--navy-800)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Placeholder overlay when no token is set */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(7,14,36,0.8)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'rgba(77,240,197,0.1)',
            border: '1px solid rgba(77,240,197,0.25)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="12" width="4" height="8" rx="1" fill="var(--accent)" opacity="0.7"/>
              <rect x="9" y="7" width="4" height="13" rx="1" fill="var(--accent)" opacity="0.85"/>
              <rect x="16" y="2" width="4" height="18" rx="1" fill="var(--accent)"/>
            </svg>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Power BI Embed
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', maxWidth: '320px' }}>
            Replace the embed URL in{' '}
            <code style={{ color: 'var(--accent)', background: 'rgba(77,240,197,0.08)', padding: '1px 5px', borderRadius: '4px' }}>
              dashboard/page.tsx
            </code>
            {' '}with your Power BI Publish-to-Web link.
          </p>
        </div>

        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiYOUR_EMBED_TOKEN_HERE"
          width="100%"
          height="820"
          allowFullScreen
          style={{ display: 'block', border: 'none' }}
        />
      </div>
    </div>
  );
}

// ── page_about.tsx ──────────────────────────────────────────────────────────
'use client';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AboutPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!user) router.push('/login'); }, [user]);

  const pillars = [
    {
      num: '01',
      color: 'var(--accent)',
      title: 'Data Visualisation',
      body: 'Interactive Power BI dashboards and Recharts graphics translate complex World Bank data into legible, actionable visuals.',
    },
    {
      num: '02',
      color: 'var(--accent-2)',
      title: 'Interactive Mapping',
      body: 'Leaflet-powered maps with proportional bubble overlays let you explore inequality geographically at a glance.',
    },
    {
      num: '03',
      color: 'var(--warm)',
      title: 'Storytelling',
      body: 'Curated insight narratives contextualise the numbers — turning statistics into stories about real people and policy.',
    },
    {
      num: '04',
      color: '#60C890',
      title: 'AI Assistant',
      body: 'Ask questions, request comparisons, and explore scenarios with an AI assistant trained on inequality research.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      {/* Header */}
      <div style={{ marginBottom: '5rem' }}>
        <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          About the platform
        </span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3.5rem', marginTop: '1rem', maxWidth: '600px' }}>
          Built to make inequality visible
        </h1>
      </div>

      {/* Mission block */}
      <div style={{
        background: 'var(--navy-800)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '3.5rem',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
          background: 'linear-gradient(to bottom, var(--accent), var(--accent-2))',
          borderRadius: '3px 0 0 3px',
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.85, maxWidth: '620px' }}>
          The Global Income Inequality Analysis Platform is a comprehensive dashboard designed
          to visualise and understand wealth distribution patterns across the world — making
          complex economic data accessible and actionable for everyone.
        </p>
      </div>

      {/* Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '4rem' }}>
        {pillars.map((p) => (
          <div key={p.num} style={{
            background: 'var(--navy-800)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <span style={{ color: p.color, fontFamily: "'DM Serif Display', serif", fontSize: '0.95rem', opacity: 0.7 }}>{p.num}</span>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', color: 'var(--text-primary)' }}>{p.title}</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75 }}>{p.body}</p>
          </div>
        ))}
      </div>

      {/* Sources */}
      <div style={{
        padding: '2rem 2.5rem',
        background: 'var(--navy-800)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        display: 'flex',
        gap: '0',
        alignItems: 'stretch',
      }}>
        {['World Bank', 'OECD', 'UN Data'].map((src, i) => (
          <div key={src} style={{
            flex: 1,
            padding: '0 2rem',
            borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Source {i + 1}</p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', color: 'var(--text-primary)' }}>{src}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

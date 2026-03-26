'use client';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '6rem',
          overflow: 'hidden',
          borderRadius: '24px',
          background: 'var(--navy-800)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(77,240,197,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,240,197,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '70%', height: '130%',
          background: 'radial-gradient(ellipse at center, rgba(124,109,251,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '20%', width: '50%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(77,240,197,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Large background number */}
        <div style={{
          position: 'absolute', right: '4rem', top: '50%', transform: 'translateY(-50%)',
          fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(160px, 22vw, 320px)',
          color: 'rgba(77,240,197,0.04)', lineHeight: 1, pointerEvents: 'none',
          userSelect: 'none', letterSpacing: '-0.05em',
        }}>38.4</div>

        <div style={{ position: 'relative', zIndex: 10, padding: '0 4rem', maxWidth: '760px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(77,240,197,0.08)', border: '1px solid rgba(77,240,197,0.2)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '2.5rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{ color: 'var(--accent)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Live Data · 2024
            </span>
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.0,
            marginBottom: '2rem',
          }}>
            Global<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Income</em><br />
            Inequality
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '3rem', maxWidth: '480px', lineHeight: 1.7 }}>
            Understanding wealth distribution across 186 nations through data-driven analysis and interactive visualisation.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{
              padding: '14px 32px',
              background: 'var(--accent)',
              color: 'var(--navy-950)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '100px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
            }}>
              View Dashboard
            </Link>
            <Link href="/insights" style={{
              padding: '14px 32px',
              border: '1px solid rgba(77,240,197,0.3)',
              color: 'var(--accent)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: '0.9rem',
              borderRadius: '100px',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'background 0.2s',
            }}>
              Explore Insights
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key Metrics ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', marginTop: '1.5px', background: 'var(--border)' }}>
        {[
          { label: 'Average Gini Index', value: '38.4', sub: 'World average (2024)' },
          { label: 'Countries Covered', value: '186', sub: 'Across all continents' },
          { label: 'Data Sources', value: '3', sub: 'World Bank · OECD · UN' },
        ].map((m, i) => (
          <div key={i} style={{
            background: 'var(--navy-800)',
            padding: '3rem 2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
              background: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--accent-2)' : 'var(--warm)',
              opacity: 0.6,
            }} />
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {m.label}
            </p>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '5rem',
              lineHeight: 1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.04em',
              marginBottom: '0.75rem',
            }}>{m.value}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Overview ── */}
      <div style={{ marginTop: '7rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div>
          <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>01 — Definition</span>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '2.5rem',
            marginTop: '1.25rem',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
          }}>What is income inequality?</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            Income inequality refers to the unequal distribution of income across a population.
            The Gini Index — ranging from 0 (perfect equality) to 100 (perfect inequality) —
            is the most widely used and internationally comparable metric.
          </p>
        </div>
        <div>
          <span style={{ color: 'var(--accent-2)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>02 — Significance</span>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '2.5rem',
            marginTop: '1.25rem',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
          }}>Why it matters</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            High inequality can hinder economic growth, increase social unrest, and limit access
            to opportunities. Understanding these patterns is critical for policy-makers,
            researchers, and advocates working toward sustainable development.
          </p>
        </div>
      </div>

      {/* ── Divider with data strip ── */}
      <div style={{
        marginTop: '7rem',
        padding: '2rem 3rem',
        background: 'var(--navy-800)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {[
          ['South Africa', '63.0', 'Highest'],
          ['Brazil', '53.4', 'High'],
          ['United States', '41.5', 'Elevated'],
          ['India', '35.7', 'Moderate'],
          ['Germany', '31.7', 'Low'],
          ['Finland', '27.2', 'Very Low'],
        ].map(([country, gini, level]) => (
          <div key={country} style={{ flex: '1', minWidth: '100px' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{country}</p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: 'var(--text-primary)', lineHeight: 1 }}>{gini}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.25rem' }}>{level}</p>
          </div>
        ))}
      </div>

      {/* ── AI Assistant ── */}
      <AIAssistant />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

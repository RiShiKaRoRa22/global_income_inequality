'use client';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ContactPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!user) router.push('/login'); }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Get in touch
        </span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3.5rem', marginTop: '1rem' }}>
          Contact Us
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '420px' }}>
          We welcome feedback, collaboration opportunities, and questions about the platform.
        </p>
      </div>

      {/* Contact cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {/* Email */}
        <a
          href="mailto:info@globalinequality.org"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2.5rem',
            background: 'var(--navy-800)',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-700)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy-800)')}
        >
          <div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Email
            </p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              info@globalinequality.org
            </p>
          </div>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            border: '1px solid var(--border-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)' }} />

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/company/global-income-inequality"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2.5rem',
            background: 'var(--navy-800)',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-700)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy-800)')}
        >
          <div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              LinkedIn
            </p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              /company/global-income-inequality
            </p>
          </div>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            border: '1px solid var(--border-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>
      </div>

      {/* Info strip */}
      <div style={{
        marginTop: '3rem',
        padding: '1.75rem 2.25rem',
        background: 'rgba(77,240,197,0.05)',
        border: '1px solid rgba(77,240,197,0.12)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: 'var(--accent)', marginTop: '7px', flexShrink: 0,
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          We typically respond within 2–3 business days. For urgent academic or policy collaboration inquiries,
          please mention your affiliation in the subject line.
        </p>
      </div>
    </div>
  );
}

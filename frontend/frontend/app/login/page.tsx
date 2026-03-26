'use client';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials. Try demo / demo');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--navy-950)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(77,240,197,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(77,240,197,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      {/* Glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,109,251,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '420px',
        margin: '0 2rem',
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '56px', height: '56px',
            background: 'rgba(77,240,197,0.1)',
            border: '1px solid rgba(77,240,197,0.25)',
            borderRadius: '16px',
            marginBottom: '1.25rem',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
              <path d="M3 12h18M12 2c-4 4-4 12 0 20M12 2c4 4 4 12 0 20" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.75rem',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Global Income Inequality Platform
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--navy-800)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                USERNAME
              </label>
              <input
                type="text"
                placeholder="demo or admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 18px',
                  background: 'var(--navy-900)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(77,240,197,0.4)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 18px',
                  background: 'var(--navy-900)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(77,240,197,0.4)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(240,80,80,0.08)',
                border: '1px solid rgba(240,80,80,0.25)',
                borderRadius: '10px',
                padding: '10px 16px',
                marginBottom: '1.25rem',
                color: '#F08080',
                fontSize: '0.85rem',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'rgba(77,240,197,0.5)' : 'var(--accent)',
                color: 'var(--navy-950)',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                borderRadius: '12px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s, transform 0.1s',
                letterSpacing: '0.02em',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.75rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            Demo credentials:{' '}
            <code style={{ color: 'var(--accent)', background: 'rgba(77,240,197,0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.78rem' }}>
              demo / demo
            </code>
            {' '}or{' '}
            <code style={{ color: 'var(--accent)', background: 'rgba(77,240,197,0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.78rem' }}>
              admin / admin
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}

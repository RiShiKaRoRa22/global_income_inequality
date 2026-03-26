'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const data = [
  { country: 'South Africa', gini: 63.0 },
  { country: 'Brazil',       gini: 53.4 },
  { country: 'Mexico',       gini: 45.4 },
  { country: 'USA',          gini: 41.5 },
  { country: 'China',        gini: 38.2 },
  { country: 'India',        gini: 35.7 },
  { country: 'UK',           gini: 33.5 },
  { country: 'Germany',      gini: 31.7 },
  { country: 'Denmark',      gini: 28.3 },
  { country: 'Finland',      gini: 27.2 },
];

const getColor = (gini: number) => {
  if (gini > 55) return '#F05050';
  if (gini > 45) return '#F0A050';
  if (gini > 38) return '#F0C840';
  if (gini > 32) return '#60C890';
  return '#4DF0C5';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--navy-700)',
        border: '1px solid rgba(77,240,197,0.2)',
        borderRadius: '10px',
        padding: '12px 18px',
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: getColor(payload[0].value), fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>
          {payload[0].value}
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>Gini Coefficient</p>
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!user) router.push('/login'); }, [user]);

  const insights = [
    {
      tag: 'Developed Economies',
      color: 'var(--accent)',
      title: 'The American exception',
      body: 'Despite being a high-income nation, the USA has a Gini of 41.5 — significantly higher than its Western European peers. Tax policy, healthcare costs, and wage stagnation drive this divergence.',
    },
    {
      tag: 'Emerging Markets',
      color: '#F0A050',
      title: 'Structural inequality in the South',
      body: 'South Africa and Brazil lead the charts, reflecting deep-rooted historical inequalities, land distribution imbalances, and limited social mobility despite GDP growth.',
    },
    {
      tag: 'Nordic Model',
      color: 'var(--accent-2)',
      title: 'Redistribution works',
      body: 'Finland and Denmark sustain Gini scores below 29 through progressive taxation, universal healthcare, and strong labour market protections — demonstrating proven policy effectiveness.',
    },
    {
      tag: 'Trend Analysis',
      color: '#60C890',
      title: 'Slow convergence since 1990',
      body: 'Global inequality has slightly declined over three decades, driven primarily by growth in China and India. However, within-country inequality has risen in many advanced economies.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Data · World Bank 2024
        </span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3.5rem', marginTop: '1rem', marginBottom: '0.75rem' }}>
          Key Insights
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '540px' }}>
          Data-driven observations on global income distribution from the latest World Bank dataset.
        </p>
      </div>

      {/* Chart section */}
      <div style={{
        background: 'var(--navy-800)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '3rem',
        marginBottom: '4rem',
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Gini Coefficient Comparison
          </p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>
            Selected Countries, 2024
          </p>
        </div>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="1 0"
              stroke="rgba(72,130,200,0.08)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="country"
              stroke="var(--text-dim)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 70]}
              stroke="var(--text-dim)"
              tick={{ fill: 'var(--text-dim)', fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(77,240,197,0.04)' }} />
            <Bar dataKey="gini" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.gini)} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {[['#F05050', '> 55  Critical'], ['#F0A050', '45–55  High'], ['#F0C840', '38–45  Elevated'], ['#60C890', '32–38  Moderate'], ['#4DF0C5', '< 32  Low']].map(([color, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: color, display: 'inline-block' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {insights.map((insight, i) => (
          <div key={i} style={{
            background: 'var(--navy-800)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: insight.color, opacity: 0.7,
            }} />
            <span style={{
              display: 'inline-block',
              color: insight.color,
              background: `${insight.color}18`,
              border: `1px solid ${insight.color}30`,
              borderRadius: '100px',
              padding: '4px 12px',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              {insight.tag}
            </span>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.4rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}>
              {insight.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
              {insight.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

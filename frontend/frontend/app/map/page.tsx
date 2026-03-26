'use client';
import dynamic from "next/dynamic";
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map component...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Global Inequality Map
          </h1>
          <p className="text-gray-600">
            Interactive visualization of Gini coefficients across the world. Circle size and color indicate inequality levels.
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Inequality Levels (Gini Index)</h3>
          <div className="flex flex-wrap gap-6">
            {[
              { color: '#DC2626', range: '> 50', label: 'Very High' },
              { color: '#F97316', range: '45-50', label: 'High' },
              { color: '#F59E0B', range: '40-45', label: 'Elevated' },
              { color: '#84CC16', range: '35-40', label: 'Moderate' },
              { color: '#22C55E', range: '30-35', label: 'Low' },
              { color: '#06B6D4', range: '< 30', label: 'Very Low' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.range} ({item.label})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Component */}
        <MapComponent />
        
        {/* Data Source Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Data Source: World Bank, OECD, UN Data (2024)
        </div>
      </div>
    </div>
  );
}
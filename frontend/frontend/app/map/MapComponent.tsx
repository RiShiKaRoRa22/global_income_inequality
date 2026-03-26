'use client';
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const inequalityData = [
  { lat: -30.5595, lng: 22.9375, country: 'South Africa', gini: 63.0, color: '#DC2626' },
  { lat: -14.235,  lng: -51.925, country: 'Brazil', gini: 53.4, color: '#F97316' },
  { lat: 23.634,   lng: -102.55, country: 'Mexico', gini: 45.4, color: '#F59E0B' },
  { lat: 37.090,   lng: -95.712, country: 'USA', gini: 41.5, color: '#EAB308' },
  { lat: 35.861,   lng: 104.195, country: 'China', gini: 38.2, color: '#84CC16' },
  { lat: 20.593,   lng: 78.962,  country: 'India', gini: 35.7, color: '#22C55E' },
  { lat: 55.378,   lng: -3.435,  country: 'United Kingdom', gini: 33.5, color: '#10B981' },
  { lat: 51.165,   lng: 10.451,  country: 'Germany', gini: 31.7, color: '#14B8A6' },
  { lat: 61.524,   lng: 105.318, country: 'Russia', gini: 36.0, color: '#84CC16' },
  { lat: -25.274,  lng: 133.775, country: 'Australia', gini: 34.3, color: '#10B981' },
  { lat: 52.367,   lng: 4.904,   country: 'Netherlands', gini: 28.0, color: '#06B6D4' },
  { lat: 46.818,   lng: 8.227,   country: 'Switzerland', gini: 29.5, color: '#06B6D4' },
  { lat: 41.902,   lng: 12.496,  country: 'Italy', gini: 35.2, color: '#22C55E' },
  { lat: 46.603,   lng: 1.888,   country: 'France', gini: 32.7, color: '#10B981' },
  { lat: 40.463,   lng: -3.749,  country: 'Spain', gini: 34.9, color: '#22C55E' },
  { lat: 35.689,   lng: 139.692, country: 'Japan', gini: 32.9, color: '#10B981' },
];

export default function MapComponent() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for component to mount
    if (!containerRef.current || mapRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Initialize map with better center
      const map = L.map(containerRef.current).setView([20, 10], 1.8);
      mapRef.current = map;

      // Add tile layer with better styling
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CartoDB',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 6,
      }).addTo(map);

      // Add circles with popups
      inequalityData.forEach((item) => {
        const radius = Math.sqrt(item.gini) * 3500; // Better scaling for circles
        
        const circle = L.circle([item.lat, item.lng], {
          color: item.color,
          fillColor: item.color,
          fillOpacity: 0.6,
          weight: 2,
          radius: radius,
        }).addTo(map);

        circle.bindPopup(`
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 180px;">
            <h4 style="font-weight: 700; margin-bottom: 8px; font-size: 16px; color: #1F2937;">${item.country}</h4>
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px;">
              <span style="color: #6B7280; font-size: 13px;">Gini Coefficient</span>
              <span style="font-weight: 700; font-size: 20px; color: ${item.color};">${item.gini}</span>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #E5E7EB;">
              <span style="color: #6B7280; font-size: 11px;">${item.gini > 50 ? 'Very High Inequality' : item.gini > 40 ? 'High Inequality' : item.gini > 30 ? 'Moderate Inequality' : 'Low Inequality'}</span>
            </div>
          </div>
        `);
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to load map. Please refresh the page.');
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200"
        style={{ background: '#f3f4f6' }}
      />
    </div>
  );
}
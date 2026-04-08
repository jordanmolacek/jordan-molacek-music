import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchSingleSheet, ShowData } from '../utils/googleSheets';
import { Loader2 } from 'lucide-react';

// Fix Leaflet marker icon issue in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for Upcoming vs Past
const upcomingIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pastIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapPageProps {
  csvMapping: Record<string, string>;
}

interface MapPin extends ShowData {
  coords: [number, number];
  isUpcoming: boolean;
}

const MapBoundsUpdater: React.FC<{ pins: MapPin[] }> = ({ pins }) => {
  const map = useMap();
  
  useEffect(() => {
    if (pins.length > 0) {
      const bounds = L.latLngBounds(pins.map(p => p.coords));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [pins, map]);
  
  return null;
};

const MapPage: React.FC<MapPageProps> = ({ csvMapping }) => {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [loading, setLoading] = useState<boolean>(false);

  const sortedYears = Object.keys(csvMapping).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    loadYear(selectedYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  const loadYear = async (year: string) => {
    setLoading(true);
    setPins([]);
    
    try {
      const data = await fetchSingleSheet(csvMapping[year]);
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const newPins: MapPin[] = data
        .filter(show => show.latitude !== null && show.longitude !== null)
        .map(show => ({
          ...show,
          coords: [show.latitude as number, show.longitude as number],
          isUpcoming: show.parsedDate >= now
        }));

      setPins(newPins);
    } catch (error) {
      console.error("Failed to load map data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: '2rem' }}>
      <h1 className="page-title">Gig Map</h1>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: '600' }}>Select Year:</span>
        {sortedYears.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            disabled={loading}
            className={`btn ${selectedYear === year ? '' : 'btn-outline'}`}
            style={{ 
              padding: '0.5rem 1.5rem', 
              fontSize: '1rem',
              backgroundColor: selectedYear === year ? 'var(--accent-color)' : 'transparent',
              border: '1px solid var(--accent-color)',
              color: selectedYear === year ? '#0f172a' : 'var(--accent-color)',
              opacity: loading && selectedYear !== year ? 0.5 : 1
            }}
          >
            {year}
          </button>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginLeft: '1rem' }}>
            <Loader2 className="animate-spin" size={20} />
            <span>Loading pins...</span>
          </div>
        )}
      </div>

      <div style={{ height: '600px', width: '100%', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--surface-color)' }}>
        <MapContainer center={[36.1627, -86.7816]} zoom={4} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBoundsUpdater pins={pins} />
          {pins.map((pin, index) => (
            <Marker 
              key={`${pin.date}-${index}`} 
              position={pin.coords} 
              icon={pin.isUpcoming ? upcomingIcon : pastIcon}
            >
              <Popup>
                <div style={{ color: '#0f172a' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{pin.venue}</strong><br/>
                  <span style={{ color: '#64748b' }}>{pin.date}</span><br/>
                  <span style={{ fontWeight: '600' }}>{pin.artistBand}</span><br/>
                  <span>{pin.city}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#2b82cb', borderRadius: '50%' }}></div>
          Upcoming Shows
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#7b7b7b', borderRadius: '50%' }}></div>
          Past Shows
        </div>
      </div>
    </div>
  );
};

export default MapPage;

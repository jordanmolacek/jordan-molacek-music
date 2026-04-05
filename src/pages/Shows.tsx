import React, { useEffect, useState } from 'react';
import { fetchSingleSheet, ShowData } from '../utils/googleSheets';
import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react';

interface ShowsProps {
  csvMapping: Record<string, string>;
}

const Shows: React.FC<ShowsProps> = ({ csvMapping }) => {
  const [showsByYear, setShowsByYear] = useState<Record<string, ShowData[]>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});

  const currentYear = new Date().getFullYear().toString();
  const sortedYears = Object.keys(csvMapping).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    // Initially load ONLY the current year
    loadYear(currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadYear = async (year: string) => {
    if (showsByYear[year] || loadingStates[year]) return;

    setLoadingStates(prev => ({ ...prev, [year]: true }));
    try {
      const data = await fetchSingleSheet(csvMapping[year]);
      setShowsByYear(prev => ({ ...prev, [year]: data }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [year]: false }));
    }
  };

  const toggleYear = async (year: string) => {
    const isExpanding = !expandedYears[year];
    setExpandedYears(prev => ({ ...prev, [year]: isExpanding }));
    
    if (isExpanding && !showsByYear[year]) {
      await loadYear(year);
    }
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcomingShows = (showsByYear[currentYear] || [])
    .filter(show => show.parsedDate >= now)
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

  const renderTable = (showList: ShowData[]) => {
    if (showList.length === 0) return <p style={{ color: 'var(--text-muted)', padding: '1rem' }}>No shows found for this period.</p>;
    return (
      <div style={{ overflowX: 'auto' }}>
        <table className="shows-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Artist / Band</th>
              <th>Venue</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {showList.map((show, index) => (
              <tr key={index}>
                <td>{show.date}</td>
                <td>{show.artistBand}</td>
                <td>{show.venue}</td>
                <td>{show.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Live Shows</h1>
      
      <div className="shows-section">
        <h2>Upcoming Shows</h2>
        {loadingStates[currentYear] && !showsByYear[currentYear] ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Loader2 className="animate-spin" size={20} /> Loading current dates...
          </div>
        ) : (
          upcomingShows.length > 0 ? renderTable(upcomingShows) : <p style={{ color: 'var(--text-muted)' }}>Check back soon for new dates.</p>
        )}
      </div>

      <div className="shows-section">
        <h2>Past Shows</h2>
        {sortedYears.map(year => (
          <div key={year} className="year-accordion" style={{ marginBottom: '1rem' }}>
            <button 
              onClick={() => toggleYear(year)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                backgroundColor: 'var(--surface-color)',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '1.25rem',
                fontWeight: '600',
                cursor: 'pointer',
                borderRadius: '0.5rem'
              }}
            >
              <span>{year} Gigs</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {loadingStates[year] && <Loader2 className="animate-spin" size={20} />}
                {expandedYears[year] ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
              </div>
            </button>
            {expandedYears[year] && !loadingStates[year] && (
              <div style={{ padding: '1rem 0' }}>
                {renderTable((showsByYear[year] || []).filter(show => show.parsedDate < now))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;

import React, { useEffect, useState } from 'react';
import { fetchShowData, ShowData } from '../utils/googleSheets';

interface ShowsProps {
  csvUrls: string[];
}

const Shows: React.FC<ShowsProps> = ({ csvUrls }) => {
  const [shows, setShows] = useState<ShowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      try {
        const data = await fetchShowData(csvUrls);
        setShows(data);
      } catch (err) {
        setError('Failed to load show data.');
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, [csvUrls]);

  if (loading) return <div className="page-container" style={{ textAlign: 'center' }}>Loading shows...</div>;
  if (error) return <div className="page-container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{error}</div>;

  const now = new Date();
  // Adjust 'now' slightly so today's shows stay in upcoming until tomorrow
  now.setHours(0, 0, 0, 0);

  const upcomingShows = shows.filter(show => show.parsedDate >= now).sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
  const pastShows = shows.filter(show => show.parsedDate < now);

  const renderTable = (showList: ShowData[]) => {
    if (showList.length === 0) {
      return <p style={{ color: 'var(--text-muted)' }}>No shows found. Make sure you have valid Google Sheets URLs configured.</p>;
    }
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
        {renderTable(upcomingShows)}
      </div>

      <div className="shows-section">
        <h2>Past Shows</h2>
        {renderTable(pastShows)}
      </div>
    </div>
  );
};

export default Shows;

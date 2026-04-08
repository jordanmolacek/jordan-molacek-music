export interface ShowData {
  date: string;
  pay: string;
  duration: string;
  paid: string;
  artistBand: string;
  instrument: string;
  venue: string;
  city: string;
  leadVox: string;
  drums: string;
  keys: string;
  backingVox: string;
  guitar1: string;
  guitar2: string;
  trumpet: string;
  bass: string;
  fiddle: string;
  event: string;
  notes: string;
  latitude: number | null;
  longitude: number | null;
  parsedDate: Date;
}

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

export const fetchSingleSheet = async (url: string): Promise<ShowData[]> => {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    const rows = csvText.replace(/\r/g, '').split('\n').filter(row => row.trim() !== '');
    if (rows.length < 2) return [];

    const rawHeaders = parseCSVLine(rows[0]);
    const headerMap: Record<string, number> = {};
    rawHeaders.forEach((h, index) => {
      const normalized = h.toLowerCase().replace(/[^a-z0-9]/g, '');
      headerMap[normalized] = index;
    });

    const getVal = (values: string[], possibleKeys: string[]) => {
      for (const key of possibleKeys) {
        if (headerMap[key] !== undefined) {
          return values[headerMap[key]];
        }
      }
      return '';
    };
    
    return rows.slice(1)
      .map(row => {
        const values = parseCSVLine(row);
        const dateStr = getVal(values, ['date']).toLowerCase();
        
        if (!dateStr || dateStr.includes('total')) return null;

        const artistBand = getVal(values, ['artistband', 'artist', 'band']);
        const venue = getVal(values, ['venue']);
        
        if (!artistBand && !venue) return null;

        const parsedDate = new Date(dateStr);
        
        // Handle "Lat,Lon" combined column
        const latLonStr = getVal(values, ['latlon', 'latitude', 'coords']);
        let latitude: number | null = null;
        let longitude: number | null = null;
        
        if (latLonStr) {
          const parts = latLonStr.split(',').map(p => parseFloat(p.trim()));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            latitude = parts[0];
            longitude = parts[1];
          }
        }

        return {
          date: getVal(values, ['date']),
          pay: getVal(values, ['pay']),
          duration: getVal(values, ['durationhrs', 'duration']),
          paid: getVal(values, ['paid']),
          artistBand: artistBand,
          instrument: getVal(values, ['instrument']),
          venue: venue,
          city: getVal(values, ['city']),
          leadVox: getVal(values, ['leadvox']),
          drums: getVal(values, ['drums']),
          keys: getVal(values, ['keys']),
          backingVox: getVal(values, ['backingvox']),
          guitar1: getVal(values, ['guitar1']),
          guitar2: getVal(values, ['guitar2']),
          trumpet: getVal(values, ['trumpet']),
          bass: getVal(values, ['bass']),
          fiddle: getVal(values, ['fiddle']),
          event: getVal(values, ['event']),
          notes: getVal(values, ['notes']),
          latitude,
          longitude,
          parsedDate: isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate,
        } as ShowData;
      })
      .filter((show): show is ShowData => show !== null)
      .sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());
  } catch (error) {
    console.error('Error fetching show data:', error);
    return [];
  }
};

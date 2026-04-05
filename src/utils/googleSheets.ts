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
  parsedDate: Date; // For sorting and filtering
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

export const fetchShowData = async (csvUrls: string[]): Promise<ShowData[]> => {
  let allShows: ShowData[] = [];

  for (const url of csvUrls) {
    if (!url || url.includes('placeholder')) continue;

    try {
      const response = await fetch(url);
      const csvText = await response.text();
      
      const rows = csvText.replace(/\r/g, '').split('\n').filter(row => row.trim() !== '');
      if (rows.length < 2) continue;

      const headers = parseCSVLine(rows[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
      
      const shows = rows.slice(1).map(row => {
        const values = parseCSVLine(row);
        const data: any = {};
        headers.forEach((header, index) => {
          data[header] = values[index];
        });
        
        const dateStr = data.date || '';
        const parsedDate = new Date(dateStr);

        return {
          date: dateStr,
          pay: data.pay || '',
          duration: data.durationhrs || data.duration || '',
          paid: data.paid || '',
          artistBand: data.artistband || data.artist || '',
          instrument: data.instrument || '',
          venue: data.venue || '',
          city: data.city || '',
          leadVox: data.leadvox || '',
          drums: data.drums || '',
          keys: data.keys || '',
          backingVox: data.backingvox || '',
          guitar1: data.guitar1 || '',
          guitar2: data.guitar2 || '',
          trumpet: data.trumpet || '',
          bass: data.bass || '',
          fiddle: data.fiddle || '',
          event: data.event || '',
          notes: data.notes || '',
          parsedDate: isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate,
        } as ShowData;
      });

      allShows = [...allShows, ...shows];
    } catch (error) {
      console.error('Error fetching show data:', error);
    }
  }

  // Sort all shows by date descending (newest first)
  return allShows.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());
};

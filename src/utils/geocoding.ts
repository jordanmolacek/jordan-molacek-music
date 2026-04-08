const cache: Record<string, [number, number]> = {};

export const geocodeCity = async (city: string): Promise<[number, number] | null> => {
  if (cache[city]) return cache[city];

  try {
    // Respect Nominatim's rate limit (1 req/sec) by adding a small delay if needed
    // In this app, we'll handle the delay in the component to show progress
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      cache[city] = coords;
      return coords;
    }
  } catch (error) {
    console.error(`Geocoding failed for ${city}:`, error);
  }
  return null;
};

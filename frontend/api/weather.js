export default async function handler(req, res) {
  // Allow GET requests only
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenWeather API key is not configured in Vercel Environment Variables' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Failed to fetch weather data from OpenWeather'
      });
    }

    // Clean formatted weather response
    const formattedData = {
      city: data.name,
      country: data.sys?.country || '',
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      condition: data.weather?.[0]?.description
        ? data.weather[0].description.replace(/\b\w/g, (c) => c.toUpperCase())
        : 'Clear',
      icon: data.weather?.[0]?.icon || '01d',
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind?.speed * 3.6), // convert to km/h
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
    };

    res.status(200).json(formattedData);
  } catch (err) {
    console.error('Error in Vercel weather function:', err);
    res.status(500).json({ error: 'Internal server error while fetching weather' });
  }
}

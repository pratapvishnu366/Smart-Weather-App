import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Live Weather endpoint via OpenWeatherMap
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenWeather API key is not configured in backend/.env' });
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

    // Transform and return clean data for the frontend
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
      windSpeed: Math.round(data.wind?.speed * 3.6), // convert m/s to km/h
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
    };

    res.json(formattedData);
  } catch (err) {
    console.error('Error fetching weather:', err);
    res.status(500).json({ error: 'Internal server error while fetching weather' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

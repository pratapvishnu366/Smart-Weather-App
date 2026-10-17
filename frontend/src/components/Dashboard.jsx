import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudSun, Search, AlertCircle, Loader2 } from 'lucide-react';
import MainWeatherCard from './MainWeatherCard';
import WeatherHighlights from './WeatherHighlights';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
const POPULAR_CITIES = ['New Delhi', 'London', 'Tokyo', 'New York', 'Paris', 'Dubai'];

function Dashboard() {
  const [searchCity, setSearchCity] = useState('');
  const [activeCity, setActiveCity] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  // Fetch real weather data from our Express backend
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/weather`, {
        params: { city },
      });
      setWeather(response.data);
      setActiveCity(city);
    } catch (err) {
      console.error('Fetch weather error:', err);
      if (err.response?.status === 404) {
        setError(`City "${city}" not found. Please check spelling.`);
      } else if (err.response?.status === 401) {
        setError('OpenWeather API Key is still activating (takes ~10-15 mins). Please retry shortly!');
      } else if (!err.response) {
        setError('Cannot connect to backend server. Make sure "npm run dev" is running in backend folder (port 5001).');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch weather data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('New Delhi');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    fetchWeather(searchCity.trim());
    setSearchCity('');
  };

  return (
    <div className="dashboard-container">
      {/* 1. Header & Navigation */}
      <header className="dashboard-header">
        <div className="brand-section">
          <div className="brand-icon">
            <CloudSun size={28} />
          </div>
          <div>
            <h1 className="brand-title">SmartWeather</h1>
            <p className="date-badge">{today}</p>
          </div>
        </div>

        {/* 2. City Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search city (e.g. London, Tokyo, Mumbai)..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>

      {/* 3. Quick Popular City Filter Chips */}
      <div className="quick-cities">
        <span className="quick-label">Popular:</span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            className={`city-chip ${activeCity.toLowerCase() === city.toLowerCase() ? 'active' : ''}`}
            onClick={() => fetchWeather(city)}
            disabled={loading}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 4. Alerts & Status Messages */}
      {error && (
        <div className="status-banner error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="status-banner loading">
          <Loader2 size={20} className="spinner" />
          <span>Fetching live weather data...</span>
        </div>
      )}

      {/* 5. Main Dashboard View */}
      <main>
        {weather && (
          <>
            {/* Primary Current Weather Card */}
            <MainWeatherCard weather={weather} />

            {/* Weather Highlights Metric Grid (Step 3) */}
            <WeatherHighlights weather={weather} />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;

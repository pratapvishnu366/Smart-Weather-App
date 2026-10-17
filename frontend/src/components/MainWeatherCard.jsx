import React from 'react';
import { MapPin, Sun, CloudSun, CloudRain, Thermometer, ArrowUp, ArrowDown } from 'lucide-react';
import './MainWeatherCard.css';

function MainWeatherCard({ weather }) {
  if (!weather) return null;

  // Simple icon selector based on condition string
  const renderWeatherIcon = (condition) => {
    const text = condition.toLowerCase();
    if (text.includes('rain')) return <CloudRain size={72} className="weather-svg rain" />;
    if (text.includes('cloud')) return <CloudSun size={72} className="weather-svg cloud" />;
    return <Sun size={72} className="weather-svg sun" />;
  };

  return (
    <div className="main-weather-card">
      <div className="card-top">
        <div className="location-info">
          <div className="location-header">
            <MapPin size={22} className="pin-icon" />
            <h2>{weather.city}, {weather.country}</h2>
          </div>
          <p className="condition-label">{weather.condition}</p>
        </div>

        <div className="weather-icon-badge">
          {renderWeatherIcon(weather.condition)}
        </div>
      </div>

      <div className="card-bottom">
        <div className="temp-display">
          <span className="current-temp">{weather.temp}</span>
          <span className="unit">°C</span>
        </div>

        <div className="temp-details">
          <div className="detail-item">
            <Thermometer size={16} className="detail-icon" />
            <span>Feels like <strong>{weather.feelsLike}°C</strong></span>
          </div>

          <div className="detail-range">
            <span className="range-item high">
              <ArrowUp size={14} /> High: {weather.high}°C
            </span>
            <span className="range-item low">
              <ArrowDown size={14} /> Low: {weather.low}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainWeatherCard;

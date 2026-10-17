import React from 'react';
import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import './WeatherHighlights.css';

function WeatherHighlights({ weather }) {
  if (!weather) return null;

  const highlights = [
    {
      id: 'humidity',
      title: 'Humidity',
      value: `${weather.humidity}%`,
      icon: <Droplets size={22} className="highlight-icon cyan" />,
      description: weather.humidity > 60 ? 'High moisture' : 'Comfortable',
    },
    {
      id: 'wind',
      title: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      icon: <Wind size={22} className="highlight-icon teal" />,
      description: weather.windSpeed > 20 ? 'Breezy' : 'Gentle wind',
    },
    {
      id: 'pressure',
      title: 'Pressure',
      value: `${weather.pressure} hPa`,
      icon: <Gauge size={22} className="highlight-icon purple" />,
      description: 'Atmospheric pressure',
    },
    {
      id: 'visibility',
      title: 'Visibility',
      value: weather.visibility ? `${weather.visibility} km` : 'N/A',
      icon: <Eye size={22} className="highlight-icon amber" />,
      description: weather.visibility >= 10 ? 'Clear view' : 'Hazy / Low visibility',
    },
  ];

  return (
    <section className="highlights-section">
      <h3 className="section-title">Today's Highlights</h3>
      <div className="highlights-grid">
        {highlights.map((item) => (
          <div key={item.id} className="highlight-card">
            <div className="card-header">
              <span className="card-title">{item.title}</span>
              {item.icon}
            </div>
            <div className="card-value">{item.value}</div>
            <div className="card-description">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeatherHighlights;

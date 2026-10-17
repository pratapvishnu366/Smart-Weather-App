# 🌤️ Smart Weather App

A modern, responsive weather dashboard built with React (Vite) and Express (Node.js), powered by real-time data from the OpenWeatherMap API.

---

## ✨ Features

- 📍 **Live Weather Data**: Real-time temperature, condition descriptions, and min/max ranges.
- 💨 **Today's Highlights Grid**:
  - Humidity percentage & comfort level
  - Wind speed in km/h
  - Atmospheric pressure (hPa)
  - Visibility (km)
- ⚡ **Quick City Filter Chips**: One-click weather lookup for popular global cities (New Delhi, London, Tokyo, New York, Paris, Dubai).
- 🔍 **Global City Search**: Search weather for any city worldwide with instant feedback and error handling.
- 🎨 **Glassmorphism UI**: Beautiful dark gradient styling with smooth responsive cards.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Lucide Icons, Axios, CSS Modules / Pure CSS
- **Backend**: Node.js, Express 5, CORS, Dotenv, Native Fetch
- **External API**: OpenWeatherMap API

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/pratapvishnu366/Smart-Weather-App.git
cd Smart-Weather-App
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=5001
OPENWEATHER_API_KEY=your_openweather_api_key
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

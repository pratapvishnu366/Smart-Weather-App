export default async function handler(req, res) {
  const { city } = req.query;
  const renderUrl = `https://smart-weather-app-0mkw.onrender.com/api/weather?city=${encodeURIComponent(city || 'New Delhi')}`;
  try {
    const response = await fetch(renderUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Render backend' });
  }
}

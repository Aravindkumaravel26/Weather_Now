import axios from 'axios';

export async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
  const res = await axios.get(url, { timeout: 10000 });
  const data = res.data;
  if (!data || !data.results || data.results.length === 0) return null;
  return data.results[0];
}

export async function fetchCurrentWeather({ latitude, longitude, timezone = 'auto' }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current_weather=true&timezone=${encodeURIComponent(timezone)}`;
  const res = await axios.get(url, { timeout: 10000 });
  return res.data;
}

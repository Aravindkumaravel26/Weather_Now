import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import { geocodeCity, fetchCurrentWeather } from './services/openMeteo';

export default function App(){
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(e){
    e && e.preventDefault();
    setError(null);
    if(!q.trim()){ setError('Please enter a city name'); return; }
    setLoading(true); setWeather(null);
    try{
      const place = await geocodeCity(q.trim());
      if(!place){ setError('Location not found'); setLoading(false); return; }
      const resp = await fetchCurrentWeather({ latitude: place.latitude, longitude: place.longitude, timezone: 'auto' });
      const current = resp.current_weather || null;
      setWeather(current);
      setMeta({ city: place.name + (place.country ? `, ${place.country}` : '') });
    }catch(err){
      console.error(err);
      setError('Network error. Try again');
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="wrap">
      <div className="card">
        <header>
          <div>
            <h1>Wheather_Now</h1>
            <p className="muted">Modern Blue Theme • Built by Aravind K</p>
          </div>
          <div className="muted">Powered by Open‑Meteo</div>
        </header>

        <div className="layout">
          <div>
            <form onSubmit={handleSearch} className="search-row">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Type city (e.g., Chennai, London)" />
              <button className="btn" type="submit">Search</button>
            </form>
            {error && <div style={{color:'#c23d3d',marginBottom:10}}>{error}</div>}

            <div style={{marginTop:12}}>
              {loading ? <Loader /> : weather ? (
                <div className="card" style={{padding:12}}>
                  <h3 style={{margin:'6px 0'}}>Current Conditions</h3>
                  <div style={{display:'flex',gap:12,alignItems:'center'}}>
                    <div style={{fontSize:28}}></div>
                    <div>
                      <div style={{fontSize:20,fontWeight:700}}>{Math.round(weather.temperature)}°C</div>
                      <div style={{color:'#165a63'}}>Observed: {new Date(weather.time).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card"><p className="muted">Search to show current weather.</p></div>
              )}
            </div>

            <footer>
              Built with ☁️ by <strong>Aravind K</strong> using React + Open‑Meteo API
            </footer>
          </div>

          <aside>
            <WeatherCard weather={weather} meta={meta} />
          </aside>
        </div>
      </div>
    </div>
  );
}

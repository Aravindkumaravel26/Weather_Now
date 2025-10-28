import React from 'react';
import { formatTime } from '../utils/helpers';

function Icon({code}){
  if(code === 0) return <div style={{fontSize:34}}>☀️</div>;
  if([1,2].includes(code)) return <div style={{fontSize:34}}>🌤️</div>;
  if(code === 3) return <div style={{fontSize:34}}>☁️</div>;
  if([51,53,55,61,63,65,80,81,82].includes(code)) return <div style={{fontSize:34}}>🌧️</div>;
  if([95].includes(code)) return <div style={{fontSize:34}}>⛈️</div>;
  return <div style={{fontSize:34}}>❓</div>;
}

export default function WeatherCard({weather, meta}) {
  if(!weather) return <div className="weather-panel card"><p className="muted">No weather loaded yet.</p></div>;
  const {temperature, windspeed, weathercode, time} = weather;
  return (
    <div className="weather-panel card">
      <Icon code={weathercode} />
      <div className="temp">{Math.round(temperature)}°C</div>
      <div className="cond">{meta?.city || 'Unknown location'}</div>
      <div className="meta">Wind {windspeed} km/h • {formatTime(time)}</div>
    </div>
  );
}

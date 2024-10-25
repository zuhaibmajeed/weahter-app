import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ hour }) => {
  return (
    <div className="weather-card">
      <h3>
        {new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>
      <img
        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
        alt={hour.weather[0].description}
      />
      <p className="temperature">{Math.round(hour.main.temp)}°C</p>
      <p className="description">{hour.weather[0].description}</p>
      <div className="details">
        <p>Humidity: {hour.main.humidity}%</p>
        <p>Wind: {Math.round(hour.wind.speed * 3.6)} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;

import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      const API_KEY = "0ef240834f601f125ae126a168367930";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error(`HTTP error! status: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(`Failed to fetch weather data: ${error.message}`);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="App" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        <h1>Weather Forecast</h1>
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={() => setCity(city)}>Search</button>
        </div>
        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weatherData && weatherData.list && (
          <div className="weather-info">
            <h2>
              {weatherData.city.name}, {weatherData.city.country}
            </h2>
            <div className="weather-cards">
              {weatherData.list.slice(0, 8).map((hour, index) => (
                <WeatherCard key={index} hour={hour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

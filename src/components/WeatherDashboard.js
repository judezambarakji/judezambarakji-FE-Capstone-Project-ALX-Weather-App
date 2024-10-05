import React, { useState, useEffect } from "react";

const API_KEY = "9bc4f078b42f16d53557501e8a98a31d";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

const SearchBar = ({ city, setCity, onSubmit }) => {
  // ... (content from the SearchBar component)
};

const WeatherDisplay = ({ weatherData }) => {
  // ... (content from the updated WeatherDisplay component)
};

const ErrorAlert = ({ message }) => {
  // ... (content from the ErrorAlert component)
};

const WeatherDashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData) {
      const updateInterval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
      return () => clearInterval(updateInterval);
    }
  }, [weatherData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Dashboard</h1>
      <SearchBar city={city} setCity={setCity} onSubmit={handleSubmit} />

      {loading && <p className="text-center">Loading...</p>}

      {error && <ErrorAlert message={error} />}

      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
};

export default WeatherDashboard;

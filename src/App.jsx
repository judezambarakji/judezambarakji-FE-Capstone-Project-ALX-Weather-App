import React, { useState, useEffect } from "react";

const API_KEY = "9bc4f078b42f16d53557501e8a98a31d";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Custom SearchBar component
const SearchBar = ({ city, setCity, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
};

// Custom WeatherDisplay component
const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const {
    name = "Unknown",
    sys = {},
    main = {},
    weather = [{}],
    wind = {},
  } = weatherData;

  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {name}
        {sys.country ? `, ${sys.country}` : ""}
      </h2>
      {main.temp !== undefined && (
        <p className="text-4xl font-bold mb-4">{Math.round(main.temp)}°C</p>
      )}
      {weather[0].description && (
        <p className="text-xl mb-4 capitalize">{weather[0].description}</p>
      )}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold">Humidity</p>
          <p>{main.humidity !== undefined ? `${main.humidity}%` : "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold">Wind Speed</p>
          <p>{wind.speed !== undefined ? `${wind.speed} m/s` : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

// Custom ErrorAlert component
const ErrorAlert = ({ message }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

// Main WeatherDashboard component
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Weather Dashboard
      </h1>
      <SearchBar city={city} setCity={setCity} onSubmit={handleSubmit} />

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {error && <ErrorAlert message={error} />}

      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
};

// Root App component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <WeatherDashboard />
    </div>
  );
};

export default App;

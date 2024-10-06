// src/hooks/useWeatherData.js

import { useState, useEffect } from "react";
import axios from "axios";

const useWeatherData = (city, apiKey) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch current weather data
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        // Fetch 5-day forecast data
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        // Combine the data
        const combinedData = {
          current: currentWeatherResponse.data,
          forecast: forecastResponse.data,
        };

        setWeatherData(combinedData);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching weather data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (city && apiKey) {
      fetchWeatherData();
    }
  }, [city, apiKey]);

  return { weatherData, loading, error };
};

export default useWeatherData;

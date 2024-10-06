import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import PrecipitationChart from "./components/PrecipitationChart";
import MonthlyRainfall from "./components/MonthlyRainfall";
import DarkModeToggle from "./components/DarkModeToggle";
import useWeatherData from "./hooks/useWeatherData";
import { fetchCityImage } from "./utils/api";

// OpenWeather API key
const WEATHER_API_KEY = "9bc4f078b42f16d53557501e8a98a31d";
// Unsplash API key
const UNSPLASH_API_KEY = "14ms9wsQHOx6-86LAis6oNjWFazP34Y4KUbM08sFeTw";

const App = () => {
  const [city, setCity] = useState("Nairobi");
  const [backgroundImage, setBackgroundImage] = useState(
    "/src/assets/images/Nairobi-Default.jpg"
  );
  const [darkMode, setDarkMode] = useState(false);

  const { weatherData, loading, error } = useWeatherData(city, WEATHER_API_KEY);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const imageUrl = await fetchCityImage(city, UNSPLASH_API_KEY);
        setBackgroundImage(
          imageUrl || "/src/assets/images/Nairobi-Default.jpg"
        );
      } catch (error) {
        console.error("Error fetching background image:", error);
        setBackgroundImage("/src/assets/images/Nairobi-Default.jpg");
      }
    };

    fetchBackgroundImage();
  }, [city]);

  useEffect(() => {
    console.log("Weather Data:", weatherData);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [weatherData, loading, error]);

  const getPrecipitationCardGradient = () => {
    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
      return "bg-gradient-to-br from-[#5382ac] to-[#759bbd]";
    }

    const temp = weatherData.list[0].main.temp;
    const cloudiness = weatherData.list[0].clouds.all;

    if (cloudiness > 50) {
      return "bg-gradient-to-br from-[#63939c] to-[#82a8b0]";
    } else if (temp >= 15) {
      return "bg-gradient-to-br from-[#f5540a] to-[#f7763b]";
    } else {
      return "bg-gradient-to-br from-[#5382ac] to-[#759bbd]";
    }
  };

  const getIconColor = () => {
    const gradient = getPrecipitationCardGradient();
    if (gradient.includes("#f5540a")) return "#f7763b";
    if (gradient.includes("#5382ac")) return "#759bbd";
    return "#82a8b0";
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`font-telegraf min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            ALX Capstone Project: Weather App
          </h1>
          <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        </header>

        <SearchBar onSearch={setCity} />

        {loading && <p>Loading weather data...</p>}

        {weatherData && weatherData.list && weatherData.list.length > 0 ? (
          <>
            <WeatherCard
              temperature={weatherData.list[0].main.temp}
              city={weatherData.city.name}
              country={weatherData.city.country}
              description={weatherData.list[0].weather[0].description}
              backgroundImage={backgroundImage}
            />

            <WeatherDetails
              humidity={weatherData.list[0].main.humidity}
              windSpeed={weatherData.list[0].wind.speed}
              pressure={weatherData.list[0].main.pressure}
              visibility={weatherData.list[0].visibility}
              iconColor={getIconColor()}
            />

            <PrecipitationChart hourlyData={weatherData.list.slice(0, 8)} />

            <DailyForecast
              forecast={weatherData.list.filter(
                (item, index) => index % 8 === 0
              )}
            />

            <MonthlyRainfall
              rainfall={45}
              change={17}
              colorScheme={{
                gradientColors: getPrecipitationCardGradient()
                  .split(" from-")[1]
                  .split(" to-"),
                iconColor: getIconColor(),
              }}
            />
          </>
        ) : (
          <p>No weather data available</p>
        )}
      </div>
    </div>
  );
};

export default App;

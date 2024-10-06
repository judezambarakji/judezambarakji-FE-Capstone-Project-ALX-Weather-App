import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import PrecipitationChart from "./components/PrecipitationChart";
import MonthlyRainfall from "./components/MonthlyRainfall";
import DarkModeToggle from "./components/DarkModeToggle";
import useWeatherData from "./hooks/useWeatherData";
import { fetchCityImage } from "./utils/api";

// Define the OpenWeather API key
const OPENWEATHER_API_KEY = "9bc4f078b42f16d53557501e8a98a31d";

// Define the Unsplash API key
const UNSPLASH_API_KEY = "14ms9wsQHOx6-86LAis6oNjWFazP34Y4KUbM08sFeTw";

function App() {
  // State to manage the current city
  const [city, setCity] = useState("Nairobi");

  // State to manage the dark mode
  const [darkMode, setDarkMode] = useState(false);

  // State to manage the background image
  const [backgroundImage, setBackgroundImage] = useState("");

  // Custom hook to fetch weather data
  const { weatherData, loading, error } = useWeatherData(
    city,
    OPENWEATHER_API_KEY
  );

  // Effect to fetch and update the background image when the city changes
  useEffect(() => {
    const updateBackgroundImage = async () => {
      try {
        const imageUrl = await fetchCityImage(city, UNSPLASH_API_KEY);
        setBackgroundImage(imageUrl);
      } catch (error) {
        console.error("Error fetching city image:", error);
        // Fallback to default image if there's an error
        setBackgroundImage("/assets/images/Nairobi-Default.jpg");
      }
    };

    updateBackgroundImage();
  }, [city]);

  // Function to determine the color scheme based on weather conditions
  const getColorScheme = () => {
    if (!weatherData) return {};

    const temp = weatherData.main.temp;
    const clouds = weatherData.clouds.all;

    if (clouds > 50) {
      return {
        gradientColors: ["#63939c", "#82a8b0"],
        iconColor: "#63939c",
      };
    } else if (temp >= 15) {
      return {
        gradientColors: ["#f5540a", "#f7763b"],
        iconColor: "#f5540a",
      };
    } else {
      return {
        gradientColors: ["#5382ac", "#759bbd"],
        iconColor: "#5382ac",
      };
    }
  };

  const colorScheme = getColorScheme();

  return (
    <div
      className={`font-telegraf min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <SearchBar onSearch={setCity} />
          <DarkModeToggle
            darkMode={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
          />
        </div>
        {loading && <p>Loading weather data...</p>}
        {error && <p>Error: {error}</p>}
        {weatherData && (
          <>
            <WeatherCard
              temperature={weatherData.main.temp}
              city={weatherData.name}
              country={weatherData.sys.country}
              description={weatherData.weather[0].description}
              backgroundImage={backgroundImage}
              sunrise={weatherData.sys.sunrise}
              sunset={weatherData.sys.sunset}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <WeatherDetails
                humidity={weatherData.main.humidity}
                uvIndex={weatherData.uvi}
                sunset={weatherData.sys.sunset}
                sunrise={weatherData.sys.sunrise}
              />
              <MonthlyRainfall
                rainfall={45} // This should be fetched from an API or calculated
                change={17}
                colorScheme={colorScheme}
              />
            </div>
            <DailyForecast forecast={weatherData.daily} />
            <PrecipitationChart
              precipitation={weatherData.hourly.map((hour) => hour.pop * 100)}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

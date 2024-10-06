import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Moon, Droplet, Wind, Sunrise, Sunset } from "lucide-react";

// OpenWeather API key
const WEATHER_API_KEY = "9bc4f078b42f16d53557501e8a98a31d";
// Unsplash API key
const UNSPLASH_API_KEY = "14ms9wsQHOx6-86LAis6oNjWFazP34Y4KUbM08sFeTw";

const App = () => {
  // State variables
  const [city, setCity] = useState("Nairobi");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    "/src/assets/images/Nairobi-Default.jpg"
  );
  const [darkMode, setDarkMode] = useState(false);

  // Fetch weather data and background image when the city changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data from OpenWeather API
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        setWeatherData(weatherResponse.data);

        // Fetch background image from Unsplash API
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_API_KEY}`
        );
        if (unsplashResponse.data.results.length > 0) {
          setBackgroundImage(unsplashResponse.data.results[0].urls.regular);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city]);

  // Function to determine the gradient color of the precipitation card
  const getPrecipitationCardGradient = () => {
    if (!weatherData) return "bg-gradient-to-br from-[#5382ac] to-[#759bbd]";

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

  // Function to get icon color based on precipitation card gradient
  const getIconColor = () => {
    const gradient = getPrecipitationCardGradient();
    if (gradient.includes("#f5540a")) return "#f7763b";
    if (gradient.includes("#5382ac")) return "#759bbd";
    return "#82a8b0";
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto p-4">
        {/* Header with app title and dark mode toggle */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            ALX Capstone Project: Weather App
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Search input for city */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 rounded-lg mb-8 bg-white dark:bg-gray-800"
        />

        {weatherData && (
          <>
            {/* Main weather card with background image */}
            <div
              className="rounded-lg overflow-hidden mb-8 text-white p-8"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                <h2 className="text-6xl font-bold mb-2">
                  {Math.round(weatherData.list[0].main.temp)}°C
                </h2>
                <p className="text-2xl mb-4">
                  {weatherData.city.name}, {weatherData.city.country}
                </p>
                <p className="text-xl">
                  {new Date().getHours() >= 18 ? "Sunset" : "Sunrise"} Time:{" "}
                  {new Date(
                    new Date().getHours() >= 18
                      ? weatherData.city.sunset * 1000
                      : weatherData.city.sunrise * 1000
                  ).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Weather details grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Humidity card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center">
                <Droplet
                  className="w-8 h-8 mr-4"
                  style={{ color: getIconColor() }}
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Humidity
                  </p>
                  <p className="text-2xl font-bold">
                    {weatherData.list[0].main.humidity}%
                  </p>
                </div>
              </div>

              {/* Wind speed card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center">
                <Wind
                  className="w-8 h-8 mr-4"
                  style={{ color: getIconColor() }}
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Wind Speed
                  </p>
                  <p className="text-2xl font-bold">
                    {weatherData.list[0].wind.speed} m/s
                  </p>
                </div>
              </div>

              {/* UV Index card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center">
                <Sun
                  className="w-8 h-8 mr-4"
                  style={{ color: getIconColor() }}
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    UV Index
                  </p>
                  <p className="text-2xl font-bold">7 of 10</p>
                </div>
              </div>

              {/* Sunrise/Sunset card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center">
                {new Date().getHours() >= 18 ? (
                  <Sunset
                    className="w-8 h-8 mr-4"
                    style={{ color: getIconColor() }}
                  />
                ) : (
                  <Sunrise
                    className="w-8 h-8 mr-4"
                    style={{ color: getIconColor() }}
                  />
                )}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().getHours() >= 18 ? "Sunset" : "Sunrise"}
                  </p>
                  <p className="text-2xl font-bold">
                    {new Date(
                      new Date().getHours() >= 18
                        ? weatherData.city.sunset * 1000
                        : weatherData.city.sunrise * 1000
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Weekly forecast */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-8">
              <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-7 gap-4">
                {weatherData.list
                  .filter((item, index) => index % 8 === 0)
                  .map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </p>
                      <p className="text-lg font-bold">
                        {Math.round(day.main.temp)}°C
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Precipitation card */}
            <div className={`rounded-lg p-4 ${getPrecipitationCardGradient()}`}>
              <h3 className="text-xl font-bold mb-4 text-white">
                Monthly Rainfall
              </h3>
              <div className="flex justify-between items-end">
                <p className="text-4xl font-bold text-white">45 mm</p>
                <p className="text-xl text-white">+17%</p>
              </div>
              <p className="text-sm text-white mt-2">This Year</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

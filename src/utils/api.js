import axios from "axios";

const UNSPLASH_API_URL = "https://api.unsplash.com";

/**
 * Fetches a city image from Unsplash API
 * @param {string} city - The name of the city
 * @param {string} apiKey - The Unsplash API key
 * @returns {Promise<string>} - A promise that resolves to the image URL
 */
export const fetchCityImage = async (city, apiKey) => {
  try {
    const response = await axios.get(`${UNSPLASH_API_URL}/search/photos`, {
      params: {
        query: city,
        client_id: apiKey,
        per_page: 1,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    } else {
      console.warn(`No image found for ${city}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching city image:", error);
    return null;
  }
};

/**
 * Fetches weather data from OpenWeather API
 * @param {string} city - The name of the city
 * @param {string} apiKey - The OpenWeather API key
 * @returns {Promise<Object>} - A promise that resolves to the weather data
 */
export const fetchWeatherData = async (city, apiKey) => {
  try {
    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    return {
      current: currentWeatherResponse.data,
      forecast: forecastResponse.data,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// You can add more API utility functions here as needed

export default {
  fetchCityImage,
  fetchWeatherData,
};

import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../components/types";

const useForecast = () => {
  const [location, setLocation] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/src/assets/Images/Nairobi-Default.jpg"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //<[]> means Typescript sets the the type to array.
  //([]) means Typescript starts with an empty array.

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const processedData = data.map((item: any) => ({
          name: item.name,
          country: item.country,
          lat: item.lat,
          lon: item.lon,
          state: item.state || "", // Include state information if available
        }));

        // Sort the options alphabetically by name, country, and state
        const sortedData = processedData.sort((a: optionType, b: optionType) =>
          `${a.name}, ${a.country}, ${a.state || ""}`.localeCompare(
            `${b.name}, ${b.country}, ${b.state || ""}`
          )
        );

        setOptions(sortedData);
        setError(null);
      })
      .catch((err) => {
        console.log("API Error: Failed to fetch search options", err);
        setError("Failed to fetch search options. Please try again.");
      });
  };

  /**
   * Handles changes to the search input, updating the location state
   * and requesting new search options.
   * @param {ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.trim() === "") {
      setError("Location needed");
      setOptions([]);
      return;
    }

    setError(null);
    getSearchOptions(value);
  };

  const fetchPexelsImage = async (cityName: string) => {
    console.log("Fetching image for:", cityName);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${cityName}+sunset+sunrise&per_page=1&orientation=landscape&size=large`,
        {
          headers: {
            Authorization: import.meta.env.VITE_REACT_APP_PEXELS_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        console.log("Setting Pexels image:", data.photos[0].src.original);
        setBackgroundImage(data.photos[0].src.original);
      } else {
        console.log("No Pexels image found, using default image");
        setBackgroundImage("/src/assets/Images/Nairobi-Default.jpg");
      }
    } catch (err) {
      console.log("API Error: Failed to fetch Pexels image", err);
      console.log("Using default image");
      setBackgroundImage("/src/assets/Images/Nairobi-Default.jpg");
    }
  };

  const getForecast = (city: optionType) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
        city.lon
      }&units=metric&appid=${
        import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
      }&json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 7 * 8), // Get 7 days of data (8 data points per day)
        };
        setForecast(forecastData);
        setError(null);
        fetchPexelsImage(city.name); // Fetch image for the city
      })
      .catch((err) => {
        console.log("API Error: Failed to fetch forecast data", err);
        setError("Failed to fetch forecast data. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Validates if a location has been entered.
   * @returns {boolean} True if location is not empty, false otherwise.
   */
  const validateLocation = (): boolean => {
    if (!location.trim()) {
      setError("Location needed");
      return false;
    }
    return true;
  };

  /**
   * Handles the form submission, calling getForecast with the selected city.
   * Does nothing if no city is selected.
   */
  const onSubmit = () => {
    if (!validateLocation()) return;

    if (!city) {
      setError("Please select a city from the dropdown.");
      return;
    }

    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setLocation(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    error,
    validateLocation,
    backgroundImage,
    isLoading,
  };
};

export default useForecast;

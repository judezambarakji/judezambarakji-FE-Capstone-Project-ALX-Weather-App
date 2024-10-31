import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../components/types";

const DEFAULT_BACKGROUND = "/src/assets/Images/Nairobi-Default.jpg";

// Nairobi default location configuration
const NAIROBI_DEFAULT = {
  name: "Nairobi",
  country: "Kenya",
  state: "",
  lat: -1.2921,
  lon: 36.8219,
};

const useForecast = () => {
  const [location, setLocation] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] =
    useState<string>(DEFAULT_BACKGROUND);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string>("");
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);

  const resetToDefaultBackground = () => {
    setBackgroundImage(DEFAULT_BACKGROUND);
  };

  // Load Nairobi weather as fallback
  const loadNairobiWeather = async () => {
    console.log("Loading Nairobi weather data");
    setUserLocation("Nairobi, Kenya");
    setCity(NAIROBI_DEFAULT);
    await getForecast(NAIROBI_DEFAULT);
    resetToDefaultBackground();
  };

  // Initialize with Nairobi weather
  useEffect(() => {
    loadNairobiWeather();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      setIsGettingLocation(true);

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("GPS position obtained:", position.coords);
          const { latitude, longitude } = position.coords;

          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${
                import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
              }`
            );

            if (!response.ok) {
              console.warn("Reverse geocoding failed, using Nairobi");
              await loadNairobiWeather();
              return;
            }

            const data = await response.json();
            if (data && data.length > 0) {
              const locationData = data[0];
              // If location is not in Kenya, use Nairobi
              if (locationData.country !== "KE") {
                console.log("Location outside Kenya, using Nairobi");
                await loadNairobiWeather();
                return;
              }

              const cityData = {
                name: locationData.name,
                country: "Kenya",
                state: locationData.state || "",
                lat: latitude,
                lon: longitude,
              };

              console.log("Location data:", cityData);
              setCity(cityData);
              setUserLocation(`${cityData.name}, Kenya`);
              await getForecast(cityData);
            } else {
              console.warn("No location data returned, using Nairobi");
              await loadNairobiWeather();
            }
          } catch (err) {
            console.error("Error getting location:", err);
            await loadNairobiWeather();
          }
          setIsGettingLocation(false);
        },
        async (err) => {
          console.error("Geolocation error:", err);
          await loadNairobiWeather();
          setIsGettingLocation(false);
        },
        options
      );
    } else {
      console.warn("Geolocation not supported, using Nairobi");
      loadNairobiWeather();
    }
  };

  const fetchPexelsImage = async (cityName: string) => {
    // For Nairobi, always use default background
    if (cityName.toLowerCase() === "nairobi") {
      resetToDefaultBackground();
      return;
    }

    try {
      const citySpecificQuery = `${cityName} city sunrise sunset`;
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${citySpecificQuery}&per_page=15&orientation=landscape&size=large`,
        {
          headers: {
            Authorization: import.meta.env.VITE_REACT_APP_PEXELS_API_KEY,
          },
        }
      );

      if (!response.ok) {
        resetToDefaultBackground();
        return;
      }

      const data = await response.json();

      const filteredPhotos = data.photos.filter((photo: any) => {
        const title = photo.alt?.toLowerCase() || "";
        return (
          title.includes("sunrise") ||
          title.includes("sunset") ||
          title.includes("dawn") ||
          title.includes("dusk")
        );
      });

      if (filteredPhotos.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredPhotos.length);
        setBackgroundImage(filteredPhotos[randomIndex].src.original);
      } else {
        resetToDefaultBackground();
      }
    } catch (err) {
      console.error("Error fetching city image:", err);
      resetToDefaultBackground();
    }
  };

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.map((item: any) => ({
          name: item.name,
          country: item.country,
          state: item.state || "",
          lat: item.lat,
          lon: item.lon,
        }));

        setOptions(processedData);
      })
      .catch((e) => {
        console.error("Search options error:", e);
      });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value === "") {
      setOptions([]);
      return;
    }

    getSearchOptions(value);
  };

  const getForecast = async (city: optionType) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
          city.lon
        }&units=metric&appid=${
          import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 7 * 8),
      };

      setForecast(forecastData);
      await fetchPexelsImage(city.name);
    } catch (err) {
      console.error("Forecast error:", err);
      resetToDefaultBackground();
    } finally {
      setIsLoading(false);
    }
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
    setLocation(option.name);
    setOptions([]);
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const validateLocation = (): boolean => {
    if (!location || !city) {
      return false;
    }
    return true;
  };

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
    setBackgroundImage,
    isLoading,
    userLocation,
    isGettingLocation,
    resetToDefaultBackground,
  };
};

export default useForecast;

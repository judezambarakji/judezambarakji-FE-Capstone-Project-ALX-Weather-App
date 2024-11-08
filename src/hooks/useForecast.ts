import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../components/types";

const DEFAULT_BACKGROUND = "/Nairobi-Default.jpg";

// Nairobi default location configuration
const NAIROBI_DEFAULT = {
  name: "Nairobi",
  country: "Kenya",
  state: "",
  lat: -1.2921,
  lon: 36.8219,
};

/**
 * Helper function to format the location string with detailed location information
 * This function takes raw location data and creates a properly formatted location string
 * @param locationData - Raw location data from the geocoding API containing address details
 * @returns A formatted string like "Your Location: Parklands, Kihara ward, Kiambu County, Kenya"
 */
const formatLocationString = (locationData: any): string => {
  try {
    // Initialize array to hold each part of the location
    const locationParts: string[] = [];

    // Helper function to capitalize first letter of each word
    const capitalizeWords = (str: string): string => {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    // Extract and format primary location (e.g., Parklands)
    const primaryLocation = locationData.local_names?.en || locationData.name;
    if (primaryLocation) {
      const formattedPrimary = capitalizeWords(
        primaryLocation.toLowerCase().replace(/ ward$/i, "")
      );
      locationParts.push(formattedPrimary);
    }

    // Extract and format ward name if different from primary location
    const wardName = locationData.address?.ward;
    if (
      wardName &&
      wardName.toLowerCase().replace(/ ward$/i, "") !==
        primaryLocation?.toLowerCase().replace(/ ward$/i, "")
    ) {
      const formattedWard = capitalizeWords(
        wardName.toLowerCase().replace(/ ward$/i, "")
      );
      locationParts.push(`${formattedWard} Ward`);
    }

    // Add county name if available
    if (locationData.state) {
      locationParts.push(`${locationData.state} County`);
    }

    // Always add Kenya as the country
    locationParts.push("Kenya");

    // Return the formatted string
    return `Your Location: ${locationParts.join(", ")}`;
  } catch (error) {
    console.error("Error formatting location string:", error);
    return "Your Location: Nairobi, Kenya";
  }
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

  // Load Nairobi weather as fallback with properly formatted location string
  const loadNairobiWeather = async () => {
    console.log("Loading Nairobi weather data");
    setUserLocation("Your Location: Nairobi City, Nairobi County, Kenya");
    setCity(NAIROBI_DEFAULT);
    await getForecast(NAIROBI_DEFAULT);
    resetToDefaultBackground();
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      setIsGettingLocation(true);
      setError(null);

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
            // First API call to get basic location data
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${
                import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
              }`
            );

            if (!response.ok) {
              setError(
                "Failed to get location details. Using Nairobi as default."
              );
              console.warn("Reverse geocoding failed, using Nairobi");
              await loadNairobiWeather();
              return;
            }

            const data = await response.json();
            if (data && data.length > 0) {
              const locationData = data[0];
              if (locationData.country !== "KE") {
                setError("Location outside Kenya. Using Nairobi as default.");
                console.log("Location outside Kenya, using Nairobi");
                await loadNairobiWeather();
                return;
              }

              // Enhanced location data processing
              try {
                // Additional API call to get ward-level details
                const detailsResponse = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                    import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY
                  }`
                );

                if (detailsResponse.ok) {
                  const detailsData = await detailsResponse.json();
                  // Combine location data with additional details
                  const enhancedLocationData = {
                    ...locationData,
                    local_names: detailsData.local_names || {},
                    address: {
                      ward: detailsData.name,
                      county: locationData.state,
                    },
                  };

                  // Set user location using the enhanced data
                  setUserLocation(formatLocationString(enhancedLocationData));
                } else {
                  // Fallback to basic formatting if details call fails
                  setUserLocation(formatLocationString(locationData));
                }
              } catch (detailsError) {
                console.error(
                  "Error fetching detailed location:",
                  detailsError
                );
                setUserLocation(formatLocationString(locationData));
              }

              const cityData = {
                name: locationData.name,
                country: "Kenya",
                state: locationData.state || "",
                lat: latitude,
                lon: longitude,
              };

              setCity(cityData);
              await getForecast(cityData);
            } else {
              setError("No location data found. Using Nairobi as default.");
              console.warn("No location data returned, using Nairobi");
              await loadNairobiWeather();
            }
          } catch (err) {
            setError("Error getting location. Using Nairobi as default.");
            console.error("Error getting location:", err);
            await loadNairobiWeather();
          }
          setIsGettingLocation(false);
        },
        async (err) => {
          setError(
            `Location access denied: ${err.message}. Using Nairobi as default.`
          );
          console.error("Geolocation error:", err);
          await loadNairobiWeather();
          setIsGettingLocation(false);
        },
        options
      );
    } else {
      setError("Geolocation not supported. Using Nairobi as default.");
      console.warn("Geolocation not supported, using Nairobi");
      loadNairobiWeather();
    }
  };

  const fetchPexelsImage = async (cityName: string) => {
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
    setError(null);

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
        setError("Failed to fetch location options. Please try again.");
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
    getUserLocation,
  };
};

export default useForecast;

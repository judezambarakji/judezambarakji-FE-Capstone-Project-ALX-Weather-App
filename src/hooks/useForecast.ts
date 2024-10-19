import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";

type UseForecastReturn = [
  string,
  optionType[],
  forecastType | null,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (option: optionType) => void,
  () => void,
  (lat: number, lon: number) => void // Add fetchWeatherByCoords to the return type
];

const useForecast = (): UseForecastReturn => {
  const [location, setLocation] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  //<[]> means Typescript sets the the type to array.
  //([]) means Typescript starts with an empty array.

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    )
      .then((response) => response.json())
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
          `${a.name}, ${a.country}, ${a.state}`.localeCompare(
            `${b.name}, ${b.country}, ${b.state}`
          )
        );

        setOptions(sortedData);
      });
  };

  /**
   * Handles changes to the search input, updating the location state
   * and requesting new search options.
   * @param {ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setLocation(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
        city.lon
      }&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&json`
    )
      .then((response) => response.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  /**
   * Handles the form submission, calling getForecast with the selected city.
   * Does nothing if no city is selected.
   */
  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const fetchWeatherByCoords = (lat: number, lon: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&json`
    )
      .then((response) => response.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  useEffect(() => {
    if (city) {
      setLocation(city.name);
      setOptions([]);
    }
  }, [city]);

  return [
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    fetchWeatherByCoords,
  ];
};

export default useForecast;

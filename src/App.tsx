import { useState, useEffect } from "react";
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element => {
  const [
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    fetchWeatherByCoords,
  ] = useForecast();
  const [showSearch, setShowSearch] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleSubmit = () => {
    if (location) {
      onSubmit();
      setShowSearch(false);
    }
  };

  const handleExit = () => {
    setShowSearch(true);
    setCurrentDayIndex(0);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (direction === "next" && currentDayIndex < 6) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  useEffect(() => {
    // Geolocation code
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
          setShowSearch(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setShowSearch(true);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
      setShowSearch(true);
    }
  }, []);

  return (
    <main className="flex justify-center items-center min-h-screen w-full p-4 bg-[url('./assets/images/Nairobi-Default.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-col items-center">
        {showSearch ? (
          <Search
            location={location}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={handleSubmit}
          />
        ) : (
          forecast && (
            <Forecast
              data={forecast}
              onExit={handleExit}
              onNavigate={handleNavigate}
              currentDayIndex={currentDayIndex}
            />
          )
        )}
      </div>
    </main>
  );
};

export default App;

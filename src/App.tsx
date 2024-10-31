import { useState } from "react";
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element => {
  const {
    location,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    validateLocation,
    backgroundImage,
    isLoading,
    userLocation,
    isGettingLocation,
    resetToDefaultBackground,
  } = useForecast();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleSubmit = () => {
    if (validateLocation()) {
      onSubmit();
      setShowSearch(false);
    }
  };

  const handleExit = () => {
    resetToDefaultBackground();
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

  return (
    <main
      className="flex justify-center items-center min-h-screen w-full p-4 bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-col items-center">
        {/* Loading State */}
        {isLoading || isGettingLocation ? (
          <div className="bg-black bg-opacity-20 backdrop-blur-ls rounded-lg p-6 text-white">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
              <div className="text-xl">Loading weather data...</div>
            </div>
          </div>
        ) : showSearch ? (
          // Search Component
          <Search
            location={location}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={handleSubmit}
            error={null} // Removed error display from UI
          />
        ) : (
          // Forecast Component
          forecast && (
            <Forecast
              data={forecast}
              onExit={handleExit}
              onNavigate={handleNavigate}
              currentDayIndex={currentDayIndex}
              userLocation={userLocation}
              onReturnToSearch={resetToDefaultBackground}
            />
          )
        )}
      </div>

      {/* Attribution */}
      <a
        href="https://www.pexels.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded hover:bg-opacity-70"
      >
        Photos provided by Pexels
      </a>
    </main>
  );
};

export default App;

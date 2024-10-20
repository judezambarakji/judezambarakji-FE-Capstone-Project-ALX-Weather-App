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
    error,
    validateLocation,
    backgroundImage,
    isLoading,
  } = useForecast();

  const [showSearch, setShowSearch] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleSubmit = () => {
    if (validateLocation()) {
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

  return (
    <main
      className="flex justify-center items-center min-h-screen w-full p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${
          backgroundImage || "/src/assets/Images/Nairobi-Default.jpg"
        })`,
      }}
    >
      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-col items-center">
        {isLoading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : showSearch ? (
          <Search
            location={location}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={handleSubmit}
            error={error}
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
      {/* Pexels attribution */}
      <a
        href="https://www.pexels.com"
        className="absolute bottom-2 right-2 text-white text-xs"
      >
        Photos provided by Pexels
      </a>
    </main>
  );
};

export default App;

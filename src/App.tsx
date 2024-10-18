import { useState } from "react";
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element => {
  const [location, options, forecast, onInputChange, onOptionSelect, onSubmit] =
    useForecast();
  const [showSearch, setShowSearch] = useState(true);

  const handleSubmit = () => {
    onSubmit();
    setShowSearch(false);
  };

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 min-h-screen w-full p-4">
      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-col items-center">
        {showSearch && (
          <Search
            location={location}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={handleSubmit}
          />
        )}
        {forecast && (
          <div className="w-full mt-4 bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg p-4 md:p-6">
            <Forecast data={forecast} />
          </div>
        )}
      </div>
    </main>
  );
};

export default App;

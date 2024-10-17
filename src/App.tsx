import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element => {
  const [location, options, forecast, onInputChange, onOptionSelect, onSubmit] =
    useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 min-h-screen w-full p-4">
      <div className="w-full max-w-[500px]">
        {forecast ? (
          <Forecast data={forecast} />
        ) : (
          <Search
            location={location}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default App;

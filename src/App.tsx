import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element => {
  const [location, options, forecast, onInputChange, onOptionSelect, onSubmit] =
    useForecast();

  return (
    <main
      className="flex justify-center items-center 
    bg-gradient-to-br from-sky-400 via-rose-400 
    h-[100vh] w-full"
    >
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
    </main>
  );
};

export default App;

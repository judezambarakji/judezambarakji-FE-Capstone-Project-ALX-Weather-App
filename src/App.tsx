import "./App.css";
import "./index.css";
import { useState, ChangeEvent } from "react";

const App = (): JSX.Element => {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  //<[]> means Typescript sets the the type to array.
  //([]) means Typescript starts with an empty array.

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .then((data) => console.log({ data }));
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

  return (
    <main
      className="flex justify-center items-center 
    bg-gradient-to-br from-sky-400 via-rose-400 
    h-[100vh] w-full"
    >
      <section
        className="bg-white bg-opacity-20 backdrop-blur-large drop-shadow-lg
        text-zinc-700 rounded w-full md:max-w-[500px] p-4 flex flex-col
        text-center items-center justify-center md:px-10 lg:p-24 h-full
        lg:h-[500px]"
      >
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black ">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter location and select an option from the dropdown menu.{" "}
        </p>
        <div className="flex mt-10 md:mt-4">
          <input
            type="text"
            value={location}
            onChange={onInputChange}
            className="px-2 py-1 rounded-l-md border-2 border-white 
             hover:border-zinc-500 hover:text-zinc-500
             text-zinc-800 focus:outline-none"
          />

          {options.map((option: { name: string }) => (
            <p>{option.name}</p>
          ))}
          {/* (option: {name: string}) means that option is an object and its key's type, name, is set to string */}

          <button
            className="rounded-r-md border-2 border-zinc-100
          hover:border-zinc-500 hover:text-zinc-500 
          text-zinc-100 px-2 py-1 cursor-pointer"
          >
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;

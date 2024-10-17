import { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
  location: string;
  options: optionType[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
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
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={location}
            onChange={onInputChange}
            className="px-2 py-1 rounded-l-md border-2 border-white 
             hover:border-zinc-500 hover:text-zinc-500
             text-zinc-800 focus:outline-none"
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700
                 hover:text-white px-2 py1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                  {/* Option.name enables the search bar to find the city and option.country adds the abbreviation for the city's country after the name of the city in the search bar.  */}
                </button>
              </li>
            ))}
            {/* (option: {name: string}) means that option is an object and the type of its key, name, is set to string */}
          </ul>
          <button
            className="rounded-r-md border-2 border-zinc-100
          hover:border-zinc-500 hover:text-zinc-500 
          text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;

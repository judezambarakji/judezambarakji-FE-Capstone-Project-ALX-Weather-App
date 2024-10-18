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
    <section className="w-full flex justify-center">
      {" "}
      {/* Added flex and justify-center */}
      <div className="w-1/2 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded p-4 md:p-6">
        {" "}
        {/* Added w-1/2 */}
        <h1 className="text-4xl font-thin text-center mb-4 text-zinc-700">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm text-center mb-4 text-zinc-700">
          Enter location and select an option from the dropdown menu.
        </p>
        <div className="relative flex mt-2 justify-center">
          <div className="w-full">
            <input
              type="text"
              value={location}
              onChange={onInputChange}
              className="px-2 py-1 rounded-l-md border-2 border-white 
               hover:border-zinc-500 hover:text-zinc-500
               text-zinc-800 focus:outline-none w-full"
            />
            <ul className="absolute top-9 bg-white ml-1 rounded-b-md w-full">
              {options.map((option: optionType, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700
                   hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="rounded-r-md border-2 border-zinc-100
          hover:border-zinc-500 hover:text-zinc-500 
          text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;

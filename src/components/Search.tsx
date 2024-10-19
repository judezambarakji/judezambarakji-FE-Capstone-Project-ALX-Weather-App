import { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
  location: string;
  options: optionType[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
  error: string | null;
};

const Search = ({
  location,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
  error,
}: Props): JSX.Element => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-1/2 bg-black bg-opacity-40 backdrop-blur-lg drop-shadow-lg rounded p-4 md:p-6 text-white">
        <h1 className="text-4xl font-thin text-center mb-4">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm text-center mb-4">
          Enter location and select an option from the dropdown menu.
        </p>
        <div className="relative flex mt-2 justify-center">
          <div className="w-full relative">
            <input
              type="text"
              value={location}
              onChange={onInputChange}
              className={`px-2 py-1 rounded-l-md border-2 ${
                error ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 focus:border-gray-500
               text-black focus:outline-none w-full`}
              placeholder="Location"
            />
            {error && (
              <p className="absolute text-red-500 text-xs mt-1">{error}</p>
            )}
            <ul className="absolute top-full left-0 right-0 bg-black bg-opacity-70 text-white rounded-b-md max-h-60 overflow-y-auto">
              {options.map((option: optionType, index: number) => (
                <li
                  key={`${option.name}-${option.country}-${
                    option.state || ""
                  }-${index}`}
                >
                  <button
                    className="text-left text-sm w-full hover:bg-gray-700 px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                    {option.state && `, ${option.state}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="rounded-r-md border-2 border-gray-300
            hover:border-gray-400 hover:bg-gray-800
            text-white px-2 py-1 cursor-pointer"
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

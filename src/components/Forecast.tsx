import { forecastType } from "./types"; // Corrected import path
import {
  getHumidityValue,
  getVisibilityValue,
  getWindDirection,
  getSunTime,
  getPrecipitation,
} from "../components/Weather";
import Tile from "./Tile";
import ArrowLeft from "../assets/icon-components/ArrowLeft";
import ArrowRight from "../assets/icon-components/ArrowRight";
import XButton from "../assets/Icon-Components/xButton"; // Import the XButton component

type Props = {
  data: forecastType;
  onExit: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  currentDayIndex: number;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
);

// Updated function to add spaces before the title text
/**
 * Adds non-breaking spaces before a string.
 * @param {string} title - The original title string.
 * @param {number} spaceCount - The number of non-breaking spaces to add before the title.
 * @returns {string} The title with added spaces before it.
 *
 * How it works:
 * 1. Create a string of non-breaking spaces with the specified count.
 * 2. Concatenate the spaces with the original title.
 *
 * To increase spacing: Increase the spaceCount parameter.
 * To decrease spacing: Decrease the spaceCount parameter.
 * Example usage: addSpacesToTitle("Wind", 2) will return "\u00A0\u00A0Wind"
 *
 * Explanation of '\u00A0':
 * '\u00A0' is a Unicode escape sequence representing a non-breaking space.
 * - '\u' indicates the start of a Unicode escape sequence.
 * - '00A0' is the hexadecimal code point for the non-breaking space character.
 * - A non-breaking space is similar to a regular space, but it prevents
 *   line breaks from occurring at that position in the text.
 */
const addSpacesToTitle = (title: string, spaceCount: number = 1): string => {
  const spaces = "\u00A0".repeat(spaceCount);
  return spaces + title;
};

/**
 * Formats a date object to display the day of the week.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string (e.g., "Friday").
 */
const formatDay = (date: Date): string => {
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

/**
 * Formats a number to a two-digit string, removing leading zeros.
 * @param {number} num - The number to format.
 * @returns {string} The formatted number as a string.
 */
const formatHour = (num: number): string => {
  return num.toString().padStart(2, "0").replace(/^0/, "");
};

const Forecast = ({
  data,
  onExit,
  onNavigate,
  currentDayIndex,
}: Props): JSX.Element => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + currentDayIndex);

  // Get the forecast data for the current day
  const currentDayForecast = data.list.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    return itemDate.getDate() === currentDate.getDate();
  });

  const today = currentDayForecast[0] || data.list[0];

  return (
    <div className="w-full bg-black bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg p-4 md:p-6 text-white relative">
      <div className="absolute top-2 right-2 flex items-center">
        <span className="mr-2">Back to Search</span>
        <button onClick={onExit} className="text-white hover:text-gray-300">
          <XButton /> {/* Replace 'X' text with XButton component */}
        </button>
      </div>
      {/* Rest of the component remains unchanged */}
      <div className="mx-auto">
        <section className="text-center mb-4 flex justify-center items-center">
          <button onClick={() => onNavigate("prev")} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-black">
              {data.name}
              <span className="font-thin"> {data.country}</span>
            </h2>
            <h1 className="text-4xl font-extrabold">
              {formatDay(currentDate)},{" "}
              <Degree temp={Math.round(today.main.temp)} />
            </h1>
            <p className="text-sm">
              {today.weather[0].main}: {today.weather[0].description}
            </p>
            <p className="text-sm">
              Highest: <Degree temp={Math.ceil(today.main.temp_max)} /> Lowest:{" "}
              <Degree temp={Math.floor(today.main.temp_min)} />
            </p>
          </div>
          <button onClick={() => onNavigate("next")} className="ml-4">
            <ArrowRight className="w-6 h-6" />
          </button>
        </section>

        <section className="flex justify-center overflow-x-scroll mt-4 pb-2 mb-5">
          {currentDayForecast.map((item, i) => (
            <div
              className="inline-block text-center w-[50px] flex-shrink-0"
              key={i}
            >
              <p className="text-xs">
                {i === 0 && currentDayIndex === 0
                  ? "Now"
                  : `${formatHour(new Date(item.dt * 1000).getHours())}:00`}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                className="w-10 h-10 mx-auto"
              />
              <p className="text-xs font-semibold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <Tile
            icon="Sunrise"
            title={addSpacesToTitle("Sunrise", 2)} // Adding 2 spaces before the title
            info={getSunTime(data.sunrise)}
            description="Dawn"
          />
          <Tile
            icon="Sunset"
            title={addSpacesToTitle("Sunset", 2)}
            info={getSunTime(data.sunset)}
            description="Dusk"
          />
          <Tile
            icon="Wind"
            title={addSpacesToTitle("Wind", 2)}
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon="Feels"
            title={addSpacesToTitle("Feels like", 2)}
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <Tile
            icon="Humidity"
            title={addSpacesToTitle("Humidity", 2)}
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Tile
            icon="Precipitation"
            title={addSpacesToTitle("Precipitation", 2)}
            info={`${Math.round(today.pop * 100)}%`}
            description={getPrecipitation(today.main.humidity)}
          />
          <Tile
            icon="Pressure"
            title={addSpacesToTitle("Pressure", 2)}
            info={`${today.main.pressure}hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <Tile
            icon="Visibility"
            title={addSpacesToTitle("Visibility", 2)}
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
};

export default Forecast;

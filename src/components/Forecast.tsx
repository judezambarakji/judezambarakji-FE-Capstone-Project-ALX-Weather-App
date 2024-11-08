import { forecastType } from "./types";
import {
  getHumidityValue,
  getVisibilityValue,
  getWindDirection,
  getSunTime,
  getPrecipitation,
} from "../components/WeatherData";
import Tile from "./Tile";
import ArrowLeft from "../assets/Icon-components/ArrowLeft";
import ArrowRight from "../assets/Icon-components/ArrowRight";
import XButton from "../assets/Icon-components/xButton";

type Props = {
  data: forecastType;
  onExit: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  currentDayIndex: number;
  userLocation?: string;
  onReturnToSearch: () => void;
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
  userLocation,
  onReturnToSearch,
}: Props): JSX.Element => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + currentDayIndex);

  const currentDayForecast = data.list.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    return itemDate.getDate() === currentDate.getDate();
  });

  const today = currentDayForecast[0] || data.list[0];

  const handleReturn = () => {
    onReturnToSearch();
    onExit();
  };

  return (
    <div className="w-full bg-black bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg p-4 md:p-6 text-white relative">
      {/* 
        Return Button Spacing Guide:
        - top-4: 16px from top (reduced from previous)
        - right-4: 16px from right
        To adjust spacing:
        - Decrease values for less space (top-2, right-2)
        - Increase values for more space (top-6, right-6)
      */}
      <div className="absolute top-4 right-4 md:top-5 md:right-5">
        <button
          onClick={handleReturn}
          className="flex items-center space-x-2 hover:bg-white/10 rounded-lg px-4 py-2 transition-all duration-200"
          aria-label="Return to search"
        >
          <span className="text-sm font-medium">Back to Search</span>
          <XButton />
        </button>
      </div>

      {/* 
        Main Content Spacing Guide:
        - pt-4: Reduced top padding (16px)
        - space-y-3: Consistent vertical spacing between sections
        To adjust main content spacing:
        - Change pt-[2-8] for different top padding
        - Modify space-y-[2-6] for section spacing
      */}
      <div className="mx-auto pt-4 space-y-3">
        {userLocation && (
          <div className="text-center">
            <p className="text-sm font-medium">{userLocation}</p>
          </div>
        )}

        <section className="text-center flex justify-center items-center">
          <button onClick={() => onNavigate("prev")} className="mr-4">
            <ArrowLeft />
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
            <ArrowRight />
          </button>
        </section>

        {/* 
          Hourly Forecast Spacing:
          - mt-3: 12px top margin
          - mb-3: 12px bottom margin
          To adjust:
          - Change mt/mb-[2-6] for different spacing
        */}
        <section className="flex justify-center overflow-x-scroll mt-3 mb-3">
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

        {/* 
          Tiles Grid Spacing:
          - gap-3: Reduced gap between tiles (12px)
          To adjust:
          - Change gap-[2-6] for different tile spacing
        */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
            icon="Wind"
            title={addSpacesToTitle("Wind", 2)}
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon="Visibility"
            title={addSpacesToTitle("Visibility", 2)}
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
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
            icon="Precipitation"
            title={addSpacesToTitle("Precipitation", 2)}
            info={`${Math.round(today.pop * 100)}%`}
            description={getPrecipitation(today.main.humidity)}
          />
          <Tile
            icon="Sunrise"
            title={addSpacesToTitle("Sunrise", 2)}
            info={getSunTime(data.sunrise)}
            description="Dawn"
          />
          <Tile
            icon="Sunset"
            title={addSpacesToTitle("Sunset", 2)}
            info={getSunTime(data.sunset)}
            description="Dusk"
          />
        </section>
      </div>
    </div>
  );
};

export default Forecast;

import { forecastType } from "../types";
import {
  getHumidityValue,
  getVisibilityValue,
  getWindDirection,
  getSunTime,
  getPrecipitation,
} from "../components/Weather";
import Sunrise from "../assets/Icon-components/Sunrise";
import Sunset from "../assets/Icon-components/Sunset";
import Wind from "../assets/Icon-components/Wind";
import Feels from "../assets/Icon-components/Feels";
import Humidity from "../assets/Icon-components/Humidity";
import Precipitation from "../assets/Icon-components/Precipitation";
import Pressure from "../assets/Icon-components/Pressure";
import Visibility from "../assets/Icon-components/Visibility";
import Tile from "./Tile";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className=" bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg w-full md:max-w-[500px] py-4 md:py-4
      md:px-10 lg:px-24 h-full lg:h-auto"
    >
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin"> {data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main}: {today.weather[0].description}
          </p>
          <p className="text-sm">
            Highest: <Degree temp={Math.ceil(today.main.temp_max)} /> Lowest:{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center w-[50px]
            flex-shrink-0"
              key={i}
            >
              <p className="text-sm">{i === 0 ? "Now" : formatTime(item.dt)}</p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-semibold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className="flex flex-wrap justify-between text-zinc-700">
          <div
            className="w-[140px] text-xs font-bold flex flex-col
          items-center bg-white/20 backdrop-blur-lg rounded
          drop-shadow-lg py-4 mb-5"
          >
            <Sunrise /> <p className="mt-2">{getSunTime(data.sunrise)}</p>
          </div>

          <div
            className="w-[140px] text-xs font-bold flex flex-col
          items-center bg-white/20 backdrop-blur-lg rounded
          drop-shadow-lg py-4 mb-5"
          >
            <Sunset /> <p className="mt-2">{getSunTime(data.sunset)}</p>
          </div>

          <Tile
            icon="Wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />

          <Tile
            icon="Feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? //Checks if the feels_like is smaller than the recorded temperature then it be feels like colder, but if feels_like is larger than the recorded temp then it feels_like warmer.
                  "colder"
                : "warmer"
            }`}
          />

          <Tile
            icon="Humidity"
            title="Humidity"
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />

          <Tile
            icon="Precipitation"
            title="Precipitation"
            info={`${Math.round(today.pop * 1000)}%`}
            description={getPrecipitation(today.main.humidity)}
          />
        </section>
      </div>
    </div>
  );
};
export default Forecast;

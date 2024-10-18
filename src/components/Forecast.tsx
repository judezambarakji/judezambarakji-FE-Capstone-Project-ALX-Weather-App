import { forecastType } from "../types";
import {
  getHumidityValue,
  getVisibilityValue,
  getWindDirection,
  getSunTime,
  getPrecipitation,
} from "../components/Weather";
import Tile from "./Tile";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className="w-full bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg p-4 md:p-6">
      <div className="mx-auto">
        <section className="text-center mb-4">
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
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center w-[50px] flex-shrink-0"
              key={i}
            >
              <p className="text-xs">
                {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
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
            title="Sunrise"
            info={getSunTime(data.sunrise)}
            description="Dawn"
          />
          <Tile
            icon="Sunset"
            title="Sunset"
            info={getSunTime(data.sunset)}
            description="Dusk"
          />
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
                ? "colder"
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
            info={`${Math.round(today.pop * 100)}%`}
            description={getPrecipitation(today.main.humidity)}
          />
          <Tile
            icon="Pressure"
            title="Pressure"
            info={`${today.main.pressure}hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <Tile
            icon="Visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
};

export default Forecast;

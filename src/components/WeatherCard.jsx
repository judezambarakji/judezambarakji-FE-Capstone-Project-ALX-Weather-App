import React from "react";
import { format } from "date-fns";
import { ReactComponent as SunriseIcon } from "../assets/icons/sunrise.svg";
import { ReactComponent as SunsetIcon } from "../assets/icons/sunset.svg";

function WeatherCard({
  temperature,
  city,
  country,
  description,
  backgroundImage,
  sunrise,
  sunset,
}) {
  const formatTime = (timestamp) =>
    format(new Date(timestamp * 1000), "h:mm a");

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-6 text-white">
        <h2 className="text-6xl font-bold mb-2">{Math.round(temperature)}°C</h2>
        <h3 className="text-3xl mb-4">
          {city}, {country}
        </h3>
        <p className="text-xl mb-4 capitalize">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <SunriseIcon className="w-6 h-6 mr-2" />
            <span>{formatTime(sunrise)}</span>
          </div>
          <div className="flex items-center">
            <SunsetIcon className="w-6 h-6 mr-2" />
            <span>{formatTime(sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

import React from "react";
import { ReactComponent as HumidityIcon } from "../assets/icons/humidity.svg";
import { ReactComponent as SunIcon } from "../assets/icons/sun.svg";
import { ReactComponent as SunriseIcon } from "../assets/icons/sunrise.svg";
import { ReactComponent as SunsetIcon } from "../assets/icons/sunset.svg";
import { format } from "date-fns";

function WeatherDetails({ humidity, uvIndex, sunrise, sunset }) {
  const formatTime = (timestamp) =>
    format(new Date(timestamp * 1000), "h:mm a");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <HumidityIcon className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold">Humidity</h3>
        </div>
        <p className="text-2xl font-bold">{humidity}%</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <SunIcon className="w-6 h-6 mr-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">UV Index</h3>
        </div>
        <p className="text-2xl font-bold">{uvIndex} of 10</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <SunriseIcon className="w-6 h-6 mr-2 text-orange-500" />
          <h3 className="text-lg font-semibold">Sunrise</h3>
        </div>
        <p className="text-2xl font-bold">{formatTime(sunrise)}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <SunsetIcon className="w-6 h-6 mr-2 text-red-500" />
          <h3 className="text-lg font-semibold">Sunset</h3>
        </div>
        <p className="text-2xl font-bold">{formatTime(sunset)}</p>
      </div>
    </div>
  );
}

export default WeatherDetails;

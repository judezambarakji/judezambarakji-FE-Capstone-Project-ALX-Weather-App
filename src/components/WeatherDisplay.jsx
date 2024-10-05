import React from "react";

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const {
    name = "Unknown",
    sys = {},
    main = {},
    weather = [{}],
    wind = {},
  } = weatherData;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">
        {name}
        {sys.country ? `, ${sys.country}` : ""}
      </h2>
      {main.temp !== undefined && (
        <p className="text-4xl font-bold mb-4">{Math.round(main.temp)}°C</p>
      )}
      {weather[0].description && (
        <p className="text-xl mb-4">{weather[0].description}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{main.humidity !== undefined ? `${main.humidity}%` : "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold">Wind Speed</p>
          <p>{wind.speed !== undefined ? `${wind.speed} m/s` : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

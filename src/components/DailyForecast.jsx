// import React from "react";
// import { format, fromUnixTime } from "date-fns";
// import { ReactComponent as SunIcon } from "../assets/Icons/sun.svg";
// import { ReactComponent as CloudIcon } from "../assets/Icons/cloud.svg";
// import { ReactComponent as RainIcon } from "../assets/Icons/heavy-rain.svg";
// import { ReactComponent as SnowIcon } from "../assets/Icons/snow.svg";
// import { ReactComponent as ThunderstormIcon } from "../assets/Icons/thunderstorm.svg";

// function DailyForecast({ forecast }) {
//   const getWeatherIcon = (weather) => {
//     switch (weather) {
//       case "Clear":
//         return <SunIcon className="w-8 h-8 text-yellow-500" />;
//       case "Clouds":
//         return <CloudIcon className="w-8 h-8 text-gray-500" />;
//       case "Rain":
//         return <RainIcon className="w-8 h-8 text-blue-500" />;
//       case "Snow":
//         return <SnowIcon className="w-8 h-8 text-blue-300" />;
//       case "Thunderstorm":
//         return <ThunderstormIcon className="w-8 h-8 text-purple-500" />;
//       default:
//         return <CloudIcon className="w-8 h-8 text-gray-500" />;
//     }
//   };

//   if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
//     return <div>No forecast data available</div>;
//   }

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
//         {forecast.map((day, index) => {
//           if (!day || !day.dt || !day.weather || day.weather.length === 0) {
//             return null;
//           }

//           const date = fromUnixTime(day.dt);
//           const mainWeather = day.weather[0].main;
//           const description = day.weather[0].description;
//           const maxTemp = day.temp?.max ?? day.main?.temp_max;
//           const minTemp = day.temp?.min ?? day.main?.temp_min;

//           return (
//             <div key={index} className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-2">
//                 {format(date, "EEEE")}
//               </h3>
//               <div className="mb-2">{getWeatherIcon(mainWeather)}</div>
//               <p className="text-sm">
//                 <span className="font-bold">{Math.round(maxTemp)}°C</span>
//                 {" / "}
//                 <span>{Math.round(minTemp)}°C</span>
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 {description.charAt(0).toUpperCase() + description.slice(1)}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default DailyForecast;

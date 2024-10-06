import React from "react";
import { ReactComponent as HeavyRainIcon } from "../assets/Icons/heavy-rain.svg";

function MonthlyRainfall({ rainfall, change, colorScheme }) {
  const gradientStyle = {
    background: `linear-gradient(to right, ${colorScheme.gradientColors[0]}, ${colorScheme.gradientColors[1]})`,
  };

  return (
    <div className="rounded-lg shadow p-4" style={gradientStyle}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Monthly Rainfall</h3>
        <HeavyRainIcon className="w-8 h-8 text-white" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold text-white">{rainfall} mm</p>
          <p className="text-sm text-white opacity-75">This Year</p>
        </div>
        <div className="text-right">
          <p
            className={`text-2xl font-bold ${
              change >= 0 ? "text-green-300" : "text-red-300"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </p>
          <p className="text-sm text-white opacity-75">vs last year</p>
        </div>
      </div>
    </div>
  );
}

export default MonthlyRainfall;

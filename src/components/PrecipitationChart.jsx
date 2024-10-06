import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PrecipitationChart({ precipitation }) {
  const data = precipitation.map((value, index) => ({
    time: index,
    precipitation: value,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Daily Precipitation</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="precipitation" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PrecipitationChart;

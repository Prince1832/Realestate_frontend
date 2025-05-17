import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ChartBox = ({ data }) => {
  if (!data) {
    return (
      <div className="p-4 border border-red-100 rounded-lg bg-red-50">
        <p className="text-red-600">No chart data available</p>
      </div>
    );
  }

  if (data.type === 'comparison') {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{data.title}</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.datasets[0].data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={data.datasets[0].x_key} />
              <YAxis label={{ value: 'Price (₹/sqft)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`₹${value}`, "Price"]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataset.y_key}
                  name={dataset.label}
                  data={dataset.data}
                  stroke={dataset.borderColor}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{data.title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.x_key} />
            <YAxis label={{ value: 'Price (₹/sqft)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value) => [`₹${value}`, "Price"]}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Line
              type="monotone"
              dataKey={data.y_key}
              stroke="#4f46e5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartBox;
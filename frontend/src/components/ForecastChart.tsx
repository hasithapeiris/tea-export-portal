import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartProps } from "../types";

const ForecastChart: FC<ChartProps> = ({ data, label, dValue1, dValue2 }) => {
  return (
    <div className="p-4 bg-white border rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Year-Month",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            domain={[dValue1, dValue2]}
            label={{ value: "USD Million", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={label} stroke="#50C878" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;

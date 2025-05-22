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
import { RegionalChartProps } from "../types";

const RegionalChart: FC<RegionalChartProps> = ({
  data,
  label1,
  label2,
  label3,
}) => {
  return (
    <div className="p-4 bg-white border rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={label1}
            name="Low Grown"
            stroke="#50C878"
          />
          <Line
            type="monotone"
            dataKey={label2}
            name="Mid Grown"
            stroke="#8A9A5B"
          />
          <Line
            type="monotone"
            dataKey={label3}
            name="High Grown"
            stroke="#C9CC3F"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegionalChart;

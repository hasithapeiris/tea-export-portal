import axios from "axios";
import { useEffect, useState } from "react";
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

const YearForecastChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/forex-forecast"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filter data based on date range
  // const handleFilter = () => {
  //   const { start, end } = dateRange;
  //   if (!start || !end) return;

  //   const filteredData = data.filter((d) => d.Date >= start && d.Date <= end);
  //   setData(filteredData);
  // };

  return (
    <div className="p-4 bg-white border rounded-lg">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Forecasted_Production"
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="Forecasted_Forex_Earnings"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearForecastChart;

import { useEffect, useState } from "react";
import { Tea_Export } from "../assets";
import { ChartGrid, FEESummary, ForecastChart, SubHeader } from "../components";
import axios from "axios";

const ForexForecast = () => {
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState([]);
  const title = "Forecasted Foreign Exchange Earnings";
  const description =
    "Forecast foreign exchange earnings affecting the tea industry. Stay prepared for currency shifts and optimize export strategies with ARIMA-driven forecasts.";

  useEffect(() => {
    fetchData();
    fetchCharts("forecastedFee");
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

  const fetchCharts = async (label = "") => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mini-charts`,
        {
          params: label ? { label } : {},
        }
      );
      setCharts(response.data);
    } catch (error) {
      console.error("Error fetching charts:", error);
    }
  };

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="wrapper mt-14">
        <ForecastChart
          data={data}
          label="forecastedFee"
          dValue1={75}
          dValue2={125}
        />
        <div className="mt-8">
          <ChartGrid charts={charts} dValue1={75} dValue2={125} />
        </div>
        <div className="mt-8">
          <FEESummary />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <a
            href="fee_forecast.csv"
            download="fee_forecast.csv"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg 
          hover:bg-green-700 transition"
          >
            Download FEE Data
          </a>
        </div>
      </div>
    </>
  );
};

export default ForexForecast;

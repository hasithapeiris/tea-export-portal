import { useEffect, useState } from "react";
import { Tea_Export } from "../assets";
import {
  RegionalChart,
  RegionalMiniChart,
  RegionalSummary,
  SubHeader,
} from "../components";
import axios from "axios";
import { RegionalChartType } from "../types";

const RegionalProdForecast = () => {
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState<RegionalChartType[]>([]);
  const title = "Forecasted Regional Production";
  const description =
    "Forecast the production of main three regions, from 2024 to 2026. Use ARIMA-based insights to plan cultivation and exports effectively.";

  useEffect(() => {
    fetchData();
    fetchCharts("regionalProduction");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/regional-prod"
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
        <div className="wrapper-header my-14 text-center text-gray-600 space-y-4">
          <p>
            Tea production in all three categories remained stable across 2025
            and 2026, with only minor variations in monthly output. Low Grown
            and Mid Grown production saw slight increases, whereas High Grown
            production experienced a small decline. Seasonal fluctuations were
            evident, but no drastic shifts occurred, reflecting a balanced and
            predictable trend in tea production during these years.
          </p>
        </div>
        <RegionalChart
          data={data}
          label1="lowGrownProduction"
          label2="midGrownProduction"
          label3="highGrownProduction"
        />
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
              <div key={index} className="bg-white border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">{chart.title}</h2>
                <p className="text-gray-600 mb-4">{chart.description}</p>
                <RegionalMiniChart
                  data={chart.data}
                  label1="lowGrownProduction"
                  label2="midGrownProduction"
                  label3="highGrownProduction"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <RegionalSummary />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <a
            href="merged_elevations.csv"
            download="merged_elevations.csv"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg 
          hover:bg-green-700 transition"
          >
            Download Regional Data
          </a>
        </div>
      </div>
    </>
  );
};

export default RegionalProdForecast;

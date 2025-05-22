import { useEffect, useState } from "react";
import { Tea_Export } from "../assets";
import {
  ChartGrid,
  ForecastChart,
  SubHeader,
  TeaProductionSummary,
} from "../components";
import axios from "axios";

const NationalProdForecast = () => {
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState([]);
  const title = "Forecasted National Tea Production";
  const description =
    "View Sri Lanka’s overall tea production forecast, integrating data from all elevations. Use these insights to anticipate industry trends and market fluctuations.";

  useEffect(() => {
    fetchData();
    fetchCharts("nationalProduction");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/national-prod"
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
          label="nationalProduction"
          dValue1={10}
          dValue2={30}
        />
        <div className="mt-8">
          <ChartGrid charts={charts} dValue1={10} dValue2={30} />
        </div>
        <div className="mt-8">
          <TeaProductionSummary />
        </div>
        {/* <div className="wrapper-header mt-14 text-center text-gray-600 space-y-4">
          <p>
            Tea production in 2025 and 2026 shows a stable and slightly
            increasing trend, with total production rising from 310.73 million
            kg in 2025 to 312.94 million kg in 2026. The average monthly
            production also increased marginally from 25.89 million kg to 26.08
            million kg, indicating consistent growth in the industry. Both years
            exhibit similar seasonal patterns, with production dipping in May
            (around 22.67-22.68 million kg) and peaking towards the end of the
            year, particularly in November 2025 (26.71 million kg) and October
            2026 (27.28 million kg).
          </p>
        </div> */}
        <div className="mt-12 flex flex-col items-center">
          <a
            href="ntp_forecast.csv"
            download="ntp_forecast.csv"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg 
          hover:bg-green-700 transition"
          >
            Download Production Data
          </a>
        </div>
      </div>
    </>
  );
};

export default NationalProdForecast;

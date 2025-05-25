import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "jspdf-autotable";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import Loading from "../../components/Loading";
import PredictionTable from "../../components/predictions/PredictionTable";
import PredictionChart from "../../components/predictions/PredictionChart";
import PredictionFilter from "../../components/predictions/PredictionFilter";
import PredictionStatistics from "../../components/predictions/PredictionStatistics";
import type {
  PredictionDataPoint,
  RegionPrediction,
  PredictionDetails,
  Statistics,
} from "../../types/prediction-types";
import { SubHeader } from "../../components";
import { Tea_Export } from "../../assets";

const TeaPredictionDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [prediction, setPrediction] = useState<PredictionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<RegionPrediction[]>([]);

  const title = "Tea Price Prediction Details";
  const description =
    "Forecast tea prices affecting the tea industry. Stay prepared for currency shifts and optimize export strategies with Prophet forecasts.";

  useEffect(() => {
    const fetchPredictionDetails = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}tea/predictions/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch prediction details");
        }
        const data = (await response.json()) as PredictionDetails;
        setPrediction(data);
        setFilteredData(data.data);
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictionDetails();
  }, [id]);

  const calculateStatistics = (data: PredictionDataPoint[]): Statistics => {
    const prices = data.map((p) => p.predicted_price);
    const startDate = data[0].date;
    const endDate = data[data.length - 1].date;
    const highestPrice = Math.max(...prices);
    const lowestPrice = Math.min(...prices);
    const avgPrice = (
      prices.reduce((a, b) => a + b, 0) / prices.length
    ).toFixed(2);
    return { startDate, endDate, highestPrice, lowestPrice, avgPrice };
  };

  //Handle Download PDF
  const downloadPDF = async (): Promise<void> => {
    const doc = new jsPDF("p", "mm", "a4");

    for (let index = 0; index < filteredData.length; index++) {
      const cardElement = document.getElementById(`cardContainer-${index}`);

      if (cardElement) {
        try {
          const canvas = await html2canvas(cardElement, { scale: 2 });
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 190;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (index > 0) {
            doc.addPage();
          }

          doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        } catch (error) {
          console.error("Error capturing card:", error);
        }
      }
    }

    doc.save("Tea_Prediction_Report.pdf");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center">
        <Loading />
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex min-h-screen justify-center">
        <p>No prediction data found</p>
      </div>
    );
  }

  const createdAt = new Date(prediction.createdAt);
  const date = createdAt.toLocaleDateString();
  const time = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="min-h-screen p-4 bg-cover bg-center">
        <div className="w-full bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <div className="flex justify-between text-black text-lg mb-4">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-green-600 ">
                <strong>Forecast Periods:</strong> {prediction.periods} Months
              </p>
              <p className="text-md text-gray-800">
                <strong>Prediction Generated on:</strong> {date}
              </p>
              <p className="text-md text-gray-800">
                <strong>Time:</strong> {time}
              </p>
            </div>
          </div>

          <PredictionFilter
            prediction={prediction}
            setFilteredData={setFilteredData}
            downloadPDF={downloadPDF}
          />

          {/* Line Charts for Each Region */}
          {filteredData.map((region, index) => {
            const { startDate, endDate, highestPrice, lowestPrice, avgPrice } =
              calculateStatistics(region.data);
            return (
              <div
                key={index}
                id={`cardContainer-${index}`}
                className="mb-6 flex"
              >
                <Card className="w-full">
                  <h3 className="text-2xl font-semibold text-cyan-800 mb-4">
                    {region.region
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h3>
                  <div className="flex justify-between">
                    <div
                      id={`chartContainer-${index}`}
                      className="mt-6 w-2/3 pr-10"
                    >
                      <PredictionChart index={index} data={region.data} />
                    </div>

                    {/* Statistics Table */}
                    <div className="flex w-1/3">
                      <PredictionStatistics
                        startDate={startDate}
                        endDate={endDate}
                        highestPrice={highestPrice}
                        lowestPrice={lowestPrice}
                        avgPrice={avgPrice}
                      />
                    </div>
                  </div>
                  <PredictionTable data={region.data} />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TeaPredictionDetails;

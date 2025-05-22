import { FC } from "react";
import MiniChart from "./MiniChart";
import { Chart } from "../types";

const ChartGrid: FC<Chart> = ({ charts, dValue1, dValue2 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {charts.map((chart, index) => (
        <div key={index} className="bg-white border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">{chart.title}</h2>
          <p className="text-gray-600 mb-4">{chart.description}</p>
          <MiniChart
            data={chart.data}
            label={chart.label}
            dValue1={dValue1}
            dValue2={dValue2}
          />
        </div>
      ))}
    </div>
  );
};

export default ChartGrid;

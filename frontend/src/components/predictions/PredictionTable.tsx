import React from "react";

interface PredictionData {
  date: string;
  predicted_price: number;
  lower_bound: number;
  upper_bound: number;
}

interface PredictionTableProps {
  data: PredictionData[];
}

const PredictionTable: React.FC<PredictionTableProps> = ({ data }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200 bg-white/30 backdrop-blur-md shadow-sm mt-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Date</th>
          <th className="border border-gray-300 p-2">Predicted Price</th>
          <th className="border border-gray-300 p-2">Lower Bound</th>
          <th className="border border-gray-300 p-2">Upper Bound</th>
        </tr>
      </thead>
      <tbody>
        {data.map((prediction, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">{prediction.date}</td>
            <td className="border border-gray-300 p-2">
              {prediction.predicted_price}
            </td>
            <td className="border border-gray-300 p-2">
              {prediction.lower_bound}
            </td>
            <td className="border border-gray-300 p-2">
              {prediction.upper_bound}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PredictionTable;

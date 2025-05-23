import React from "react";

interface PredictionStatisticsProps {
  startDate: string;
  endDate: string;
  highestPrice: string | number;
  lowestPrice: string | number;
  avgPrice: string | number;
}

const PredictionStatistics: React.FC<PredictionStatisticsProps> = ({
  startDate,
  endDate,
  highestPrice,
  lowestPrice,
  avgPrice,
}) => {
  return (
    <div className="flex w-full">
      <table className="min-w-full border-collapse border border-gray-200 bg-white/30 backdrop-blur-md shadow-sm mt-6 text-center">
        <tbody>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 ">Start Date</th>
            <td className="border border-gray-300 ">{startDate}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <th className="border border-gray-300">End Date</th>
            <td className="border border-gray-300">{endDate}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300">Highest Price</th>
            <td className="border border-gray-300">{highestPrice}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <th className="border border-gray-300">Lowest Price</th>
            <td className="border border-gray-300">{lowestPrice}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300">Average Price</th>
            <td className="border border-gray-300">{avgPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PredictionStatistics;

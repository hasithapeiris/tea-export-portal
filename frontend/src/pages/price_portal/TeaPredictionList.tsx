"use client";

import type React from "react";

import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Define interfaces for our data structures
interface Prediction {
  _id: string;
  periods: number;
  createdAt: string;
  [key: string]: any;
}

const TeaPredictionList = (): JSX.Element => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchPredictionSummaries = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}tea/predictions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch prediction summaries");
      }

      const data = (await response.json()) as Prediction[];
      console.log("API Response Data:", data); // Debugging log

      if (Array.isArray(data) && data.length === 0) {
        console.log("No data received, setting noData state.");
        setNoData(true);
        setPredictions([]); // Ensure state is explicitly cleared
      } else {
        setNoData(false);
        setPredictions([...data]); // Force state update with a new array reference
      }
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictionSummaries();
  }, []);

  const handlePredictionClick = (id: string): void => {
    navigate(`/portal/price/prediction-details/${id}`);
  };

  const handleDelete = async (id: string): Promise<void> => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}tea/predictions/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete prediction");
        }

        Swal.fire("Deleted!", "Prediction has been deleted.", "success");

        // Refresh predictions after deletion
        setPredictions(
          predictions.filter((prediction) => prediction._id !== id)
        );
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen text-center text-red-500 mt-20 justify-center">
        Loading...
      </div>
    );
  }

  if (noData) {
    return (
      <div className="flex min-h-screen text-center text-red-500 mt-20 justify-center">
        No data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-cover bg-center">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-2">
        Tea Price Forecast Summaries
      </h2>
      <hr className="border-b-1 border-green-600 mx-auto mb-6" />
      <div className="w-full">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {predictions.map((prediction, index) => {
            const createdAt = new Date(prediction.createdAt);
            const date = createdAt.toLocaleDateString();
            const time = createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={index}
                onClick={() => handlePredictionClick(prediction._id)}
                className="p-6 bg-white/30 backdrop-blur-md border border-white/20 rounded-lg shadow-lg cursor-pointer hover:bg-white/40 transition-all flex justify-between"
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-green-600">
                    <strong>Periods:</strong> {prediction.periods}
                  </p>
                  <p className="text-md text-gray-800">
                    <strong>Findout Date:</strong> {date}
                  </p>
                  <p className="text-md text-gray-800">
                    <strong>Findout Time:</strong> {time}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Trash2
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    size={20}
                    onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                      e.stopPropagation();
                      handleDelete(prediction._id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeaPredictionList;

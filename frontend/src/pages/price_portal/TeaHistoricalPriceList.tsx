"use client";

import type React from "react";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TeaPredictionList from "./TeaPredictionList";
import { SubHeader } from "../../components";
import { Tea_Export } from "../../assets";

// Define interfaces for our data structures
interface HistoryEntry {
  _id: string;
  regionCategory: string;
  region: string;
  subregion: string;
  startDate: string;
  endDate: string;
  [key: string]: any;
}

const TeaHistoricalPriceList = (): JSX.Element => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);
  const navigate = useNavigate();

  const title = "Tea Historical Price Trends";
  const description =
    "Forecast tea prices affecting the tea industry. Stay prepared for currency shifts and optimize export strategies with Prophet forecasts.";

  // Fetch all saved region–date filters (your "historical" list)
  const fetchHistory = async (): Promise<void> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}teahistory`);
      if (!res.ok) {
        throw new Error("Failed to fetch historical list");
      }
      const data = (await res.json()) as HistoryEntry[];
      if (Array.isArray(data) && data.length === 0) {
        setNoData(true);
        setHistory([]);
      } else {
        setNoData(false);
        setHistory(data);
      }
    } catch (err) {
      Swal.fire("Error", (err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete one entry
  const handleDelete = async (id: string): Promise<void> => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This entry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}teahistory/${id}`,
          { method: "DELETE" }
        );
        if (!res.ok) {
          throw new Error("Failed to delete entry");
        }
        Swal.fire("Deleted!", "Entry has been deleted.", "success");
        setHistory((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        Swal.fire("Error", (err as Error).message, "error");
      }
    }
  };

  // Navigate to details view
  const handleNavigate = (id: string): void => {
    navigate(`/portal/price/historical-prices/${id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Loading...
      </div>
    );
  }

  if (noData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        No historical data found.
      </div>
    );
  }

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="min-h-screen p-4 bg-cover bg-center">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {history.map((entry) => {
              const start = new Date(entry.startDate)
                .toISOString()
                .slice(0, 10);
              const end = new Date(entry.endDate).toISOString().slice(0, 10);

              return (
                <div
                  key={entry._id}
                  onClick={() => handleNavigate(entry._id)}
                  className="p-6 bg-white/30 backdrop-blur-md border border-white/20 rounded-lg shadow-lg cursor-pointer hover:bg-white/40 transition-all relative"
                >
                  <div className="flex flex-col space-y-1">
                    <p className="text-lg font-semibold text-green-600">
                      <strong>Category:</strong> {entry.regionCategory}
                    </p>
                    <p className="text-md text-gray-800">
                      <strong>Region:</strong> {entry.region}
                    </p>
                    <p className="text-md text-gray-800">
                      <strong>Subregion:</strong> {entry.subregion}
                    </p>
                    <p className="text-md text-gray-800">
                      <strong>Start Date:</strong> {start}
                    </p>
                    <p className="text-md text-gray-800">
                      <strong>End Date:</strong> {end}
                    </p>
                  </div>

                  <Trash2
                    size={20}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                      e.stopPropagation();
                      handleDelete(entry._id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <TeaPredictionList />
      </div>
    </>
  );
};

export default TeaHistoricalPriceList;

"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { SubHeader } from "../../components";
import { Tea_Export } from "../../assets";

// Define TypeScript interfaces
interface SubRegions {
  [key: string]: string[];
}

interface RegionCategory {
  regions: string[];
  subRegions: SubRegions;
}

interface RegionCategories {
  [key: string]: RegionCategory;
}

interface TeaPriceData {
  _id: string;
  Year: string;
  TeaRegion: string;
  SubDistrict: string;
  MonthPrice: number;
  CumulativePrice: number;
  [key: string]: any;
}

interface TeaHistoryPayload {
  regionCategory: string;
  region: string;
  subregion: string;
  startDate: string;
  endDate: string;
}

interface TeaPricePayload {
  TeaRegion: string;
  SubDistrict: string;
  startDate: string;
  endDate: string;
}

interface TeaHistoryEntry extends TeaHistoryPayload {
  _id: string;
}

// regionCategories unchanged...
const regionCategories: RegionCategories = {
  "High Grown": {
    regions: ["NUWARA ELIYA", "DIMBULA", "UDAPUSSELLAWA"],
    subRegions: {
      "NUWARA ELIYA": ["NUWARA ELIYA"],
      DIMBULA: [
        "RAMBODA",
        "PUNDALUOYA",
        "AGARAPATANA",
        "NANUOYA/LINDULA/TALAWAKELE",
        "PATANA/KOTAGALA",
        "HATTON/DICKOYA",
        "BOGAWANTALAWA",
        "UPCOT/MASKELIYA",
        "WATAWALA/GINIGATHHENA/NORTON",
      ],
      UDAPUSSELLAWA: ["UDAPUSSELLAWA/HALGRANOYA", "MATURATA"],
    },
  },
  "Medium Grown": {
    regions: ["KANDY", "UVA"],
    subRegions: {
      KANDY: [
        "KANDY/MATALE/KURUNEGALA",
        "PUSSELLAWA/HEWAHETA",
        "KOTMALE",
        "GAMPOLA/NAWALAPITIYA/DOLOSBAGE",
        "NILAMBE/HANTANE/GALAHA",
        "KADUGANNAWA",
        "MADULKELLE/KNUCKLES/RANGALA",
        "HUNASGIRIYA/MATALE/YAKDESSA",
      ],
      UVA: [
        "MADULSIMA",
        "PASSARA/LUNUGALLA",
        "ELLA/NAMUNUKULA",
        "DEMODARA/HALIELLA/BADULLA",
        "MALWATTE/WELIMADA",
        "BANDARAWELA/POONAGALLA",
        "HAPUTALE",
        "KOSLANDA/HALDUMULLA",
      ],
    },
  },
  "Low Grown": {
    regions: ["RUHUNA", "SABARAGAMUWA"],
    subRegions: {
      RUHUNA: ["MORAWAKA", "MATARA", "DENIYAYA", "GALLE", "KALUTARA"],
      SABARAGAMUWA: [
        "BALANGODA",
        "RATNAPURA",
        "KELANI VALLEY",
        "KEGALLE",
        "BALANGODA/RAKWANA",
      ],
    },
  },
};

const defaultRegionCategory = "High Grown";
const defaultRegion = "NUWARA ELIYA";
const defaultSubRegion = "NUWARA ELIYA";
const defaultStartDate = new Date("2023-08-01");
const defaultEndDate = new Date("2024-08-01");

const HistroyPrice = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const baseURL = import.meta.env.VITE_API_BASE_URL as string;

  const title = "Tea Price Details";
  const description =
    "Forecast tea prices affecting the tea industry. Stay prepared for currency shifts and optimize export strategies with Prophet forecasts.";

  // filter state
  const [regionCategory, setRegionCategory] = useState<string>(
    defaultRegionCategory
  );
  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion);
  const [selectedSubRegion, setSelectedSubRegion] =
    useState<string>(defaultSubRegion);
  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);

  // data + loading
  const [teaData, setTeaData] = useState<TeaPriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // fetch tea-price
  const fetchTeaDataByFilters = async (
    r: string,
    sr: string,
    sd: Date,
    ed: Date
  ): Promise<void> => {
    setLoading(true);
    try {
      const payload: TeaPricePayload = {
        TeaRegion: r,
        SubDistrict: sr,
        startDate: sd.toISOString().slice(0, 7),
        endDate: ed.toISOString().slice(0, 7),
      };
      const { data } = await axios.post<TeaPriceData[]>(
        `${baseURL}teaprice/getTeaPrice`,
        payload
      );
      setTeaData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // save history + fetch
  const saveSearchFilters = async (): Promise<void> => {
    try {
      const payload: TeaHistoryPayload = {
        regionCategory,
        region: selectedRegion,
        subregion: selectedSubRegion,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      await axios.post(`${baseURL}teahistory`, payload);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetTeaPrice = async (): Promise<void> => {
    await saveSearchFilters();
    fetchTeaDataByFilters(
      selectedRegion,
      selectedSubRegion,
      startDate,
      endDate
    );
  };

  // on mount or when :id changes
  useEffect(() => {
    const init = async (): Promise<void> => {
      if (id) {
        // load saved filters
        try {
          const { data: entry } = await axios.get<TeaHistoryEntry>(
            `${baseURL}teahistory/${id}`
          );
          const sd = new Date(entry.startDate);
          const ed = new Date(entry.endDate);
          setRegionCategory(entry.regionCategory);
          setSelectedRegion(entry.region);
          setSelectedSubRegion(entry.subregion);
          setStartDate(sd);
          setEndDate(ed);
          await fetchTeaDataByFilters(entry.region, entry.subregion, sd, ed);
        } catch (err) {
          console.error(err);
        }
      } else {
        // no id → use defaults
        fetchTeaDataByFilters(
          defaultRegion,
          defaultSubRegion,
          defaultStartDate,
          defaultEndDate
        );
      }
    };
    init();
  }, [id]);

  // only clear region/subregion when category is changed by user
  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRegionCategory(e.target.value);
    setSelectedRegion("");
    setSelectedSubRegion("");
  };

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="min-h-screen p-4 bg-cover bg-center">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/4">
            <label className="block text-lg font-semibold text-green-600">
              Region Category
            </label>
            <select
              className="mt-2 p-2 border rounded-md w-full"
              value={regionCategory}
              onChange={onCategoryChange}
            >
              {Object.keys(regionCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {regionCategory && (
              <>
                <label className="block mt-4 text-lg font-semibold text-green-600">
                  Region
                </label>
                <select
                  className="mt-2 p-2 border rounded-md w-full"
                  value={selectedRegion}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setSelectedRegion(e.target.value);
                    setSelectedSubRegion("");
                  }}
                >
                  <option value="">-- select --</option>
                  {regionCategories[regionCategory]?.regions.map((r) => (
                    <option key={r} value={r}>
                      {r.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </>
            )}

            {selectedRegion && (
              <div className="flex flex-col">
                <label className="block mt-4 text-lg font-semibold text-green-600">
                  Subregion
                </label>
                <select
                  className="mt-2 p-2 border rounded-md w-full"
                  value={selectedSubRegion}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedSubRegion(e.target.value)
                  }
                >
                  <option value="">-- select --</option>
                  {regionCategories[regionCategory]?.subRegions[
                    selectedRegion
                  ]?.map((sr) => (
                    <option key={sr} value={sr}>
                      {sr}
                    </option>
                  ))}
                </select>

                <label className="block mt-4 text-lg font-semibold text-green-600">
                  Start Date
                </label>
                <DatePicker
                  className="mt-2 p-2 border rounded-md w-full"
                  selected={startDate}
                  onChange={(date: Date | null) => date && setStartDate(date)}
                  dateFormat="yyyy/MM/dd"
                />

                <label className="block mt-4 text-lg font-semibold text-green-600">
                  End Date
                </label>
                <DatePicker
                  className="mt-2 p-2 border rounded-md w-full"
                  selected={endDate}
                  onChange={(date: Date | null) => date && setEndDate(date)}
                  dateFormat="yyyy/MM/dd"
                />

                <button
                  onClick={handleGetTeaPrice}
                  className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Get Tea Price Details
                </button>
              </div>
            )}
          </div>

          {/* Chart & Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
                  Previous Price Chart
                </h2>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teaData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="MonthPrice" />
                      <Line type="monotone" dataKey="CumulativePrice" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="overflow-x-auto mt-6">
                  <table className="table-auto w-full border">
                    <thead>
                      <tr>
                        <th className="border p-2">Year</th>
                        <th className="border p-2">Tea Region</th>
                        <th className="border p-2">Sub District</th>
                        <th className="border p-2">Month Price (Rs)</th>
                        <th className="border p-2">Cumulative Price (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teaData.map((d) => (
                        <tr key={d._id}>
                          <td className="border p-2">{d.Year}</td>
                          <td className="border p-2">{d.TeaRegion}</td>
                          <td className="border p-2">{d.SubDistrict}</td>
                          <td className="border p-2">{d.MonthPrice}</td>
                          <td className="border p-2">{d.CumulativePrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistroyPrice;

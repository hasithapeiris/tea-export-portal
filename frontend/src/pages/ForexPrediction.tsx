import React, { useState } from "react";
import axios from "axios";
import { InputFormState, PredictionResult } from "../types";
import { No_Data, Tea_Export } from "../assets";
import { SubHeader } from "../components";

const ForexPrediction: React.FC = () => {
  const [formData, setFormData] = useState<InputFormState>({
    month: 0,
    production: 0,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const title = "Predict Foreign Exchange Earnings (FEE)";
  const description =
    "Here you can predict foreign exchange earnings based on the past production and export data. Fill the form and click predict button to get the predicted FEE.";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) || value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<PredictionResult>(
        // "https://tea-plantation-portal.onrender.com/predict",
        "http://localhost:5000/predict",
        formData
      );
      setPrediction(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching the prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="wrapper-header pt-14">
        <div className="grid md:grid-cols-2 gap-8">
          <form
            className="bg-white rounded-lg p-6 border h-fit"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold mb-4">Input Features</h2>

            <div className="mb-4">
              <label htmlFor="month" className="block text-sm font-medium mb-1">
                Year & Month:
              </label>
              <input
                type="month"
                id="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="production"
                className="block text-sm font-medium mb-1"
              >
                National Production:
              </label>
              <input
                type="number"
                id="production"
                name="production"
                value={formData.production}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full font-semibold bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </form>

          {/* Prediction Results */}
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold mb-4">Prediction Results</h2>
            {loading && (
              <p className="text-green-500">Fetching prediction...</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {prediction ? (
              <div className="grid grid-cols-1 gap-4">
                {/* High Grown Production */}
                <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                  <img
                    src="/icon.png"
                    alt="High Grown"
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg">FEE (USD)</p>
                    <p className="text-xl font-bold">{prediction.feeUsd} kg</p>
                  </div>
                </div>

                {/* Medium Grown Production */}
                <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                  <img
                    src="/icon.png"
                    alt="Medium Grown"
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg">FEE (LKR)</p>
                    <p className="text-xl font-bold">{prediction.feeLkr} kg</p>
                  </div>
                </div>
              </div>
            ) : (
              !loading && (
                <>
                  <p className="text-gray-500">
                    Enter inputs to see predictions.
                  </p>
                  <img
                    src={No_Data}
                    alt="No Data"
                    className="w-96 m-auto pt-12"
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForexPrediction;

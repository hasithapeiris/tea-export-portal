const FEESummary = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 2025 Summary */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            💹 2025 Summary
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">⭐ Average Monthly FEE:</span> 105.83
              million USD
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Highest FEE Month:</span> August
              2025 (112.60 million USD)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Lowest FEE Month:</span> September
              2025 (94.51 million USD)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Trend:</span> Fluctuate throughout
              the year, with a noticeable dip in September and a peak in August.
            </p>
          </div>
        </div>

        {/* 2026 Summary */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            💹 2026 Summary
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">⭐ Average Monthly FEE:</span> 106.08
              million USD
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Highest FEE Month:</span> August
              2026 (115.18 million USD)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Lowest FEE Month:</span> September
              2026 (99.24 million USD)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Trend:</span> Similar to 2025, FEEs
              fluctuate, with a dip in September and a peak in August.
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            💹 Comparison
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">✅ Average FEEs:</span> The average
              FEE in 2026 (106.08 million USD) is slightly higher than in 2025
              (105.83 million USD).
            </p>
            <p className="text-gray-600">
              <span className="font-bold">✅ Seasonal Patterns:</span> Both
              years exhibit similar seasonal patterns, with lower FEEs in
              September and higher FEEs in August.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">✅ Peak FEEs:</span> The highest FEE
              occurs in August 2026 (115.18 million USD), which is higher than
              the peak in August 2025 (112.60 million USD).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FEESummary;

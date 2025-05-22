const TeaProductionSummary = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 2025 Summary */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🍃 2025 Summary
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">⭐ Total Production:</span> 310.73
              million kg
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Monthly Average:</span> 25.89
              million kg
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Highest Production Month:</span>{" "}
              November 2025 (26.71 million kg)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Lowest Production Month:</span> May
              2025 (22.67 million kg)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Trend:</span> Fluctuates with a dip
              in May and a peak in November.
            </p>
          </div>
        </div>

        {/* 2026 Summary */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🍃 2026 Summary
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">⭐ Total Production:</span> 312.94
              million kg
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Monthly Average:</span> 26.08
              million kg
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Highest Production Month:</span>{" "}
              October 2026 (27.28 million kg)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Lowest Production Month:</span> May
              2026 (22.68 million kg)
            </p>
            <p className="text-gray-600">
              <span className="font-bold">⭐ Trend:</span> Similar to 2025, with
              a dip in May and a peak in October.
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🍃 Comparison
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">✅ Total Production:</span> 2026 shows
              a slight increase (312.94 million kg vs. 310.73 million kg).
            </p>
            <p className="text-gray-600">
              <span className="font-bold">✅ Monthly Average:</span> Slightly
              higher in 2026 (26.08 million kg vs. 25.89 million kg).
            </p>
            <p className="text-gray-600">
              <span className="font-bold">✅ Seasonal Patterns:</span> Both
              years exhibit similar patterns, with lower production in May and
              higher production in October-November.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaProductionSummary;

const RegionalSummary = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🍃 Low Grown Production
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The average monthly production
              </span>{" "}
              was 15.49 million kg in 2026, slightly higher than 15.48 million
              kg in 2025.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The highest monthly production
              </span>{" "}
              was in 2025 (16.13 million kg) and in 2026 (15.88 million kg).
            </p>
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The lowest monthly production
              </span>{" "}
              was 14.86 million kg in 2025 and 14.84 million kg in 2026.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🍃 Mid Grown Production
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The average monthly production
              </span>{" "}
              increased slightly from 4.04 million kg in 2025 to 4.06 million kg
              in 2026.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The highest monthly production
              </span>{" "}
              reached 5.22 million kg in 2025 and 5.20 million kg in 2026.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The lowest monthly production
              </span>{" "}
              was around 3.44 million kg in both years.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🍃 High Grown Production
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The average monthly production
              </span>{" "}
              was 5.40 million kg in 2025 and 5.39 million kg in 2026, showing a
              slight decrease.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The highest monthly production
              </span>{" "}
              was 6.79 million kg in 2025 and 6.74 million kg in 2026.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">
                ⭐ The lowest monthly production
              </span>{" "}
              was 4.33 million kg in 2025 and 4.42 million kg in 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalSummary;

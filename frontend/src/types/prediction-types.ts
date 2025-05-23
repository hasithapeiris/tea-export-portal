// Shared types for all prediction components
export interface PredictionDataPoint {
  date: string;
  predicted_price: number;
  lower_bound: number;
  upper_bound: number;
  [key: string]: any;
}

export interface RegionPrediction {
  region: string;
  data: PredictionDataPoint[];
}

export interface PredictionDetails {
  _id: string;
  periods: number;
  data: RegionPrediction[];
  createdAt: string;
  [key: string]: any;
}

export interface Statistics {
  startDate: string;
  endDate: string;
  highestPrice: number;
  lowestPrice: number;
  avgPrice: string;
}

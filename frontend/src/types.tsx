export interface InputFormState {
  month: number;
  production: number;
}

export interface PredictionResult {
  feeUsd: number;
  feeLkr: number;
}

interface ChartData {
  [key: string]: number | string;
}

interface RegionalChartData {
  month: string;
  lowGrownProduction: number;
  midGrownProduction: number;
  highGrownProduction: number;
}

interface ChartInfo {
  title: string;
  description: string;
  label: string;
  data: ChartData[];
}

interface RegionalChartInfo {
  title: string;
  description: string;
  label: string;
  data: RegionalChartData[];
}

export interface Chart {
  charts: ChartInfo[];
  dValue1: number;
  dValue2: number;
}

export interface RegionalChartType {
  data: RegionalChartData[];
  description: string;
  title: string;
  charts: RegionalChartInfo[];
}

export interface ChartProps {
  data: ChartData[];
  label: string;
  dValue1: number;
  dValue2: number;
}

export interface RegionalChartProps {
  data: RegionalChartData[];
  label1: string;
  label2: string;
  label3: string;
}

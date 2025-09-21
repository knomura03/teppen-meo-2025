export type KpiSummary = {
  reviewClickRate: number;
  reviewCount: number;
  slaCompliance: number;
  postClickThrough: number;
};

export type LocationMetric = {
  id: string;
  location: string;
  reviewCount: number;
  averageRating: number;
  clickToVisit: number;
  slaCompliance: number;
};

export const KPI_SUMMARY: KpiSummary = {
  reviewClickRate: 0.18,
  reviewCount: 428,
  slaCompliance: 0.92,
  postClickThrough: 0.12,
};

export const LOCATION_METRICS: LocationMetric[] = [
  {
    id: "loc-01",
    location: "渋谷スクランブル店",
    reviewCount: 158,
    averageRating: 4.1,
    clickToVisit: 0.22,
    slaCompliance: 0.93,
  },
  {
    id: "loc-02",
    location: "横浜みなとみらい店",
    reviewCount: 132,
    averageRating: 4.4,
    clickToVisit: 0.19,
    slaCompliance: 0.95,
  },
  {
    id: "loc-03",
    location: "池袋サンシャイン店",
    reviewCount: 96,
    averageRating: 3.9,
    clickToVisit: 0.15,
    slaCompliance: 0.88,
  },
];

export async function getKpiSummary(): Promise<KpiSummary> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return KPI_SUMMARY;
}

export async function getLocationMetrics(): Promise<LocationMetric[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return LOCATION_METRICS;
}

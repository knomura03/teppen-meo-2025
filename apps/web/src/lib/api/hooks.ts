import { useQuery } from "@tanstack/react-query";
import type { ReviewItem, ReviewStatus } from "@/lib/data/reviews";
import type { UpdateRequest } from "@/lib/data/updates";
import type { LocalPost } from "@/lib/data/posts";
import type { KpiSummary, LocationMetric } from "@/lib/data/analytics";
import { apiFetch } from "@/lib/api/fetcher";

export function useReviews(status?: ReviewStatus) {
  return useQuery<{ data: ReviewItem[] }>({
    queryKey: ["reviews", status ?? "all"],
    queryFn: () =>
      apiFetch(`/api/reviews${status ? `?status=${status}` : ""}`),
  });
}

export function useUpdateRequests() {
  return useQuery<{ data: UpdateRequest[] }>({
    queryKey: ["update-requests"],
    queryFn: () => apiFetch("/api/updates"),
  });
}

export function usePosts() {
  return useQuery<{ data: LocalPost[] }>({
    queryKey: ["posts"],
    queryFn: () => apiFetch("/api/posts"),
  });
}

export function useAnalyticsSummary() {
  return useQuery<{ summary: KpiSummary; locations: LocationMetric[] }>({
    queryKey: ["analytics", "summary"],
    queryFn: () => apiFetch("/api/analytics/summary"),
  });
}

import type {
  ReviewItem,
  ReviewStatus,
} from "@/lib/data/reviews";
import { MOCK_REVIEWS } from "@/lib/data/reviews";
import type { UpdateRequest } from "@/lib/data/updates";
import { MOCK_REQUESTS } from "@/lib/data/updates";
import type { LocalPost } from "@/lib/data/posts";
import { MOCK_POSTS } from "@/lib/data/posts";
import type { LocationMetric } from "@/lib/data/analytics";
import { LOCATION_METRICS } from "@/lib/data/analytics";

export type MockDB = {
  reviews: ReviewItem[];
  requests: UpdateRequest[];
  posts: LocalPost[];
  metrics: LocationMetric[];
};

const db: MockDB = {
  reviews: MOCK_REVIEWS,
  requests: MOCK_REQUESTS,
  posts: MOCK_POSTS,
  metrics: LOCATION_METRICS,
};

export function filterReviews(status?: ReviewStatus) {
  if (!status) return db.reviews;
  return db.reviews.filter((item) => item.status === status);
}

export function listRequests() {
  return db.requests;
}

export function listPosts() {
  return db.posts;
}

export function listMetrics() {
  return db.metrics;
}

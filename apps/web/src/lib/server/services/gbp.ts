export type GbpLocation = {
  name: string;
  title: string;
  primaryPhone?: string;
  primaryCategory?: string;
};

const MOCK_LOCATIONS: GbpLocation[] = [
  {
    name: "accounts/123456789/locations/987654321",
    title: "渋谷スクランブル店",
    primaryPhone: "+81 3-0000-0000",
    primaryCategory: "restaurant",
  },
  {
    name: "accounts/123456789/locations/654321987",
    title: "横浜みなとみらい店",
    primaryPhone: "+81 45-0000-0000",
    primaryCategory: "restaurant",
  },
];

const GBP_API_BASE_URL =
  process.env.GBP_API_BASE_URL ??
  "https://mybusinessbusinessinformation.googleapis.com/v1";

export class GbpApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "GbpApiError";
  }
}

function shouldUseMock() {
  return process.env.GBP_API_ENABLED !== "true";
}

type FetchLocationsOptions = {
  accountId: string;
  pageSize?: number;
  readMask?: string;
};

export async function fetchGbpLocations({
  accountId,
  pageSize = 10,
  readMask = "name,title,primaryPhone,primaryCategory",
}: FetchLocationsOptions): Promise<GbpLocation[]> {
  if (!accountId) {
    throw new GbpApiError("accountId is required");
  }

  if (shouldUseMock()) {
    return MOCK_LOCATIONS;
  }

  const apiKey = process.env.GBP_API_KEY;
  if (!apiKey) {
    throw new GbpApiError("GBP_API_KEY is not configured");
  }

  const url = new URL(
    `${GBP_API_BASE_URL}/accounts/${accountId}/locations`
  );
  url.searchParams.set("pageSize", pageSize.toString());
  url.searchParams.set("readMask", readMask);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new GbpApiError(
      errorPayload || "Failed to fetch GBP locations",
      response.status
    );
  }

  const json = (await response.json()) as {
    locations?: GbpLocation[];
  };

  return json.locations ?? [];
}

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchGbpLocations,
  GbpApiError,
} from "@/lib/server/services/gbp";

describe("fetchGbpLocations", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns mock data when GBP_API_ENABLED is not true", async () => {
    delete process.env.GBP_API_ENABLED;
    const result = await fetchGbpLocations({ accountId: "123" });
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("渋谷スクランブル店");
  });

  it("throws when accountId is missing", async () => {
    await expect(fetchGbpLocations({ accountId: "" })).rejects.toThrow(
      GbpApiError
    );
  });

  it("calls Google API when GBP_API_ENABLED is true", async () => {
    process.env.GBP_API_ENABLED = "true";
    process.env.GBP_API_KEY = "dummy";
    process.env.GBP_API_BASE_URL = "https://example.com";

    const mockResponse = {
      ok: true,
      json: async () => ({
        locations: [
          {
            name: "accounts/123/locations/1",
            title: "テスト店舗",
          },
        ],
      }),
    } as Response;

    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(mockResponse);

    const result = await fetchGbpLocations({ accountId: "123" });

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining("https://example.com/accounts/123/locations"),
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("テスト店舗");
  });

  it("throws GbpApiError on non-OK response", async () => {
    process.env.GBP_API_ENABLED = "true";
    process.env.GBP_API_KEY = "dummy";

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => "Forbidden",
    } as Response);

    await expect(
      fetchGbpLocations({ accountId: "123" })
    ).rejects.toBeInstanceOf(GbpApiError);

    expect(fetchSpy).toHaveBeenCalled();
  });
});

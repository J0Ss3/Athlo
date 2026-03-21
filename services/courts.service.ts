import { authenticatedFetch } from "@/lib/api";

export const CourtsService = {
  async getFeaturedCourts() {
    return authenticatedFetch("/courts/featured");
  },

  async getPopularCourts() {
    return authenticatedFetch("/courts/popular");
  },
};

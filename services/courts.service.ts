import { authenticatedFetch } from "@/lib/api";

type CourtsResponse = {
  data: {
    data: unknown[];
    totalItems: number;
  };
  meta: {
    message: string;
    status: number;
  };
  hasError: boolean;
};

export const CourtsService = {
  async getFeaturedCourts() {
    return authenticatedFetch<CourtsResponse>("/facility/field/get/all/1/6/0/rating");
  },

  async getPopularCourts() {
    return authenticatedFetch<CourtsResponse>("/facility/field/get/all/1/10/0/reviewCount");
  },
};

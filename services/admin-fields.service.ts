import { authenticatedFetch } from "@/lib/api";

type FacilityApi = {
  idFacility: number;
  facilityName: string;
};

type SportTypeApi = {
  idSportType: number;
  sportName: string;
};

type SurfaceTypeApi = {
  idSurfaceType: number;
  surfaceName: string;
};

type ProviderFacilitiesResponse = {
  data: {
    data: FacilityApi[];
    totalItems: number;
  };
  meta: {
    status: number;
    message: string;
  };
  hasError: boolean;
};

type FlatResponse<T> = {
  data: T[];
  meta: {
    status: number;
    message: string;
  };
  hasError: boolean;
};

type CourtsResponse = {
  data: {
    data: unknown[];
    totalItems: number;
  };
  meta: {
    status: number;
    message: string;
  };
  hasError: boolean;
};

type CreateCourtPayload = {
  idFacility: number;
  idSportType: number;
  fieldName: string;
  fieldNumber?: number;
  idSurfaceType: number;
  lengthValue?: number;
  widthValue?: number;
  unitType?: string;
  capacity: number;
  pricePerHour: number;
  pricePerDay?: number;
  isPremium?: boolean;
  description?: string;
  operatingHours: {
    dayOfWeek: number;
    openingTime: string;
    closingTime: string;
  }[];
  images?: {
    base64Image: string;
    isMain?: boolean;
  }[];
};

type CourtItem = {
  id: string;
  title: string;
  facility: string;
  sport: string;
  price: number;
  capacity: number;
};

export const AdminFieldsService = {
  async getProviderFacilities() {
    const response = await authenticatedFetch<ProviderFacilitiesResponse>(
      "/facility/get/all/provider/1/100/0",
    );

    return response.data.data;
  },

  async getSportTypes() {
    const response = await authenticatedFetch<FlatResponse<SportTypeApi>>(
      "/facility/sports/get/all",
    );

    return response.data;
  },

  async getSurfaceTypes() {
    const response = await authenticatedFetch<FlatResponse<SurfaceTypeApi>>(
      "/facility/surfaceType/get/all",
    );

    return response.data;
  },

  async createCourt(payload: CreateCourtPayload) {
    return authenticatedFetch("/facility/field/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getProviderCourts(): Promise<CourtItem[]> {
    const facilities = await this.getProviderFacilities();

    if (facilities.length === 0) {
      return [];
    }

    const responses = await Promise.all(
      facilities.map((facility) =>
        authenticatedFetch<CourtsResponse>(
          `/facility/field/get/facility/${facility.idFacility}/1/100/0/rating`,
        ).catch(() => null),
      ),
    );

    return responses
      .filter((response): response is CourtsResponse => Boolean(response))
      .flatMap((response) => response.data.data)
      .map((item) => {
        const court = item as {
          idField?: number;
          fieldName?: string;
          capacity?: number;
          pricePerHour?: number | string;
          Facility?: { facilityName?: string };
          SportType?: { sportName?: string };
        };

        return {
          id: String(court.idField ?? ""),
          title: court.fieldName ?? "Cancha",
          facility: court.Facility?.facilityName ?? "Sin localización",
          sport: court.SportType?.sportName ?? "Sin deporte",
          price: Number(court.pricePerHour ?? 0),
          capacity: Number(court.capacity ?? 0),
        };
      });
  },
};

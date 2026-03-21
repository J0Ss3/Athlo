import { authenticatedFetch } from "@/lib/api";

export const BookingsService = {
  async getBookings() {
    return authenticatedFetch("/bookings");
  },

  async createBooking(payload: {
    courtId: string;
    courtName: string;
    date: string;
    time: string;
    total: number;
    paymentMethod: string;
  }) {
    return authenticatedFetch("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async cancelBooking(id: string, reason: string) {
    return authenticatedFetch(`/bookings/${id}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },
};

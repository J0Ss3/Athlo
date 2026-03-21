import { authenticatedFetch } from "@/lib/api";

export const NotificationsService = {
  async getNotifications() {
    return authenticatedFetch("/notifications");
  },

  async markAsRead(id: string) {
    return authenticatedFetch(`/notifications/${id}/read`, {
      method: "POST",
    });
  },
};

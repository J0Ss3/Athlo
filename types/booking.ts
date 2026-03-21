export type Booking = {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  total: number;
  status: "active" | "completed" | "cancelled";
};

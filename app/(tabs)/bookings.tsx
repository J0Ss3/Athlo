import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import BookingCard from "@/components/bookings/bookingCard";
import styles from "@/styles/bookings.styles";
import { Booking } from "@/types/booking";

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    courtId: "1",
    courtName: "Pádel Club Central",
    date: "2026-03-23",
    time: "06:00 PM",
    total: 100,
    status: "active",
  },
  {
    id: "2",
    courtId: "2",
    courtName: "Tenis del Valle",
    date: "2026-03-27",
    time: "08:00 PM",
    total: 200,
    status: "completed",
  },
];

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  function handleCancel(id: string) {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking,
      ),
    );

    Alert.alert("Reserva cancelada", "Se canceló de forma local");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Bookings</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={() => handleCancel(booking.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

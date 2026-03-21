import { AppTheme } from "@/constants/theme";
import { Booking } from "@/types/booking";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  booking: Booking;
  onCancel?: () => void;
};

export default function BookingCard({ booking, onCancel }: Props) {
  return (
    <View
      style={{
        backgroundColor: AppTheme.colors.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        ...AppTheme.shadow.card,
      }}
    >
      <Text
        style={{ fontSize: 18, fontWeight: "700", color: AppTheme.colors.text }}
      >
        {booking.courtName}
      </Text>
      <Text style={{ color: AppTheme.colors.textMuted, marginTop: 4 }}>
        {booking.date} - {booking.time}
      </Text>
      <Text style={{ color: AppTheme.colors.textMuted, marginTop: 4 }}>
        Total: ${booking.total}
      </Text>
      <Text
        style={{
          marginTop: 6,
          fontWeight: "600",
          color: AppTheme.colors.primary,
        }}
      >
        {booking.status}
      </Text>

      {booking.status === "active" && onCancel ? (
        <TouchableOpacity
          onPress={onCancel}
          style={{
            marginTop: 12,
            backgroundColor: AppTheme.colors.primary,
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: AppTheme.colors.white, fontWeight: "700" }}>
            Cancelar
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

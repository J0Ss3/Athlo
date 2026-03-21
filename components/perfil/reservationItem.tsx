import { AppTheme } from "@/constants/theme";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  title: string;
  date1: string;
  date2: string;
  status: string;
  statusColor: string;
};

export default function ReservationItem({
  title,
  date1,
  date2,
  status,
  statusColor,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: AppTheme.colors.card,
        borderRadius: 18,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=1200&auto=format&fit=crop",
        }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 10,
          marginRight: 12,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "700", color: AppTheme.colors.text }}>
          {title}
        </Text>
        <Text style={{ color: "#7B8794", fontSize: 12, marginTop: 2 }}>
          {date1}
        </Text>
        <Text style={{ color: "#7B8794", fontSize: 12 }}>{date2}</Text>
      </View>

      <View
        style={{
          backgroundColor: statusColor,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#5B5B5B" }}>
          {status}
        </Text>
      </View>
    </View>
  );
}

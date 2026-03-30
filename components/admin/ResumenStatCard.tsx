import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
};

export default function ResumenStatCard({ label, value, icon, iconBgColor }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 13,
    color: "#667085",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0E2240",
  },
});

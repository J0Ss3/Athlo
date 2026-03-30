import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export default function AdminQuickStat({ label, value }: Props) {
  return (
    <View style={styles.quickItem}>
      <Text style={styles.quickNumber}>{value}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quickItem: {
    alignItems: "center",
  },
  quickNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quickLabel: {
    color: "gray",
  },
});

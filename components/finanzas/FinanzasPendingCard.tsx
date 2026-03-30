import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  amount: string;
  subtitle: string;
};

export default function FinanzasPendingCard({ amount, subtitle }: Props) {
  return (
    <View style={styles.pendingCard}>
      <Text style={styles.pendingTitle}>Pagos Pendientes</Text>
      <Text style={styles.pendingAmount}>{amount}</Text>
      <Text style={styles.pendingSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pendingCard: {
    backgroundColor: "#F5F0DC",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5D36A",
  },
  pendingTitle: {
    fontSize: 16,
    color: "#B56C00",
    fontWeight: "700",
    marginBottom: 10,
  },
  pendingAmount: {
    fontSize: 22,
    color: "#B56C00",
    fontWeight: "800",
    marginBottom: 4,
  },
  pendingSubtitle: {
    fontSize: 14,
    color: "#B56C00",
  },
});

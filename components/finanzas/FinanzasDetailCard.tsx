import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  cashValue: string;
  cardValue: string;
  totalValue: string;
};

export default function FinanzasDetailCard({ cashValue, cardValue, totalValue }: Props) {
  return (
    <View style={styles.detailCard}>
      <Text style={styles.detailTitle}>Desglose de Ingresos</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Pagos en Efectivo</Text>
        <Text style={styles.value}>{cashValue}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Pagos con Tarjeta</Text>
        <Text style={styles.value}>{cardValue}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{totalValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1D1D1F",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: "#5B6472",
  },
  value: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0AC243",
  },
});

import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  amount: string;
  subtitle: string;
};

export default function FinanzasHeroCard({ amount, subtitle }: Props) {
  return (
    <View style={styles.heroCard}>
      <View>
        <Text style={styles.heroTitle}>Ingresos Totales</Text>
        <Text style={styles.heroAmount}>{amount}</Text>
        <Text style={styles.heroSubtitle}>{subtitle}</Text>
      </View>
      <Feather name="dollar-sign" size={30} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#0AC243",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  heroAmount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  heroSubtitle: {
    color: "#fff",
    fontSize: 14,
  },
});

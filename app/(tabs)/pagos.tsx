import styles from "@/styles/pagos.styles";
import React from "react";
import { Text, View } from "react-native";

export default function PagosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métodos de Pago</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Tarjeta terminada en 4582</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Efectivo</Text>
      </View>
    </View>
  );
}

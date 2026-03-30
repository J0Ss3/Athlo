import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CanchasEmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="storefront-outline"
        size={78}
        color="#C9CDD3"
      />
      <Text style={styles.emptyTitle}>No tienes canchas registradas aún</Text>
      <Text style={styles.emptySubtitle}>Agrega tu primera cancha para comenzar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  emptyTitle: {
    marginTop: 14,
    fontSize: 16,
    color: "#7A8394",
    textAlign: "center",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#7A8394",
    textAlign: "center",
  },
});

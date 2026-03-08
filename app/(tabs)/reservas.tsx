import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function reservasScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Reservas</ThemedText>
      <ThemedText>
        Esta es la pantalla de reservas. Aquí puedes gestionar tus reservas.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Admin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panel de Administrador</Text>
      </View>

      <Text style={styles.subtitle}>¿Qué deseas administrar?</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#7b2ff7" }]}
          onPress={() => router.push("/resumen")}
        >
          <Ionicons name="grid-outline" size={28} color="white" />
          <Text style={styles.cardText}>Resumen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#2563eb" }]}
          onPress={() => router.push("/mis-canchas")}
        >
          <Ionicons name="business-outline" size={28} color="white" />
          <Text style={styles.cardText}>Canchas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#f97316" }]}
          onPress={() => router.push("/reservas")}
        >
          <Ionicons name="clipboard-outline" size={28} color="white" />
          <Text style={styles.cardText}>Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#16a34a" }]}
          onPress={() => router.push("/finanzas")}
        >
          <Ionicons name="cash-outline" size={28} color="white" />
          <Text style={styles.cardText}>Finanzas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.permisos}>
        <Ionicons name="shield-checkmark-outline" size={30} color="white" />
        <Text style={styles.permisosText}>Permisos</Text>
      </TouchableOpacity>

      <View style={styles.quick}>
        <Text style={styles.quickTitle}>Vista Rápida</Text>

        <View style={styles.quickRow}>
          <View style={styles.quickItem}>
            <Text style={styles.quickNumber}>0</Text>
            <Text style={styles.quickLabel}>Canchas</Text>
          </View>

          <View style={styles.quickItem}>
            <Text style={styles.quickNumber}>0</Text>
            <Text style={styles.quickLabel}>Reservas</Text>
          </View>

          <View style={styles.quickItem}>
            <Text style={styles.quickNumber}>L0</Text>
            <Text style={styles.quickLabel}>Ingresos</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 15,
  },

  header: {
    backgroundColor: "#ea580c",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    height: 100,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  cardText: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
  },

  permisos: {
    backgroundColor: "#ef4444",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    marginVertical: 15,
  },

  permisosText: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },

  quick: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
  },

  quickTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

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
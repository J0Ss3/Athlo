import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  permisos: {
    backgroundColor: "#ef4444",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 15,
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
    marginHorizontal: 15,
  },
  quickTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;

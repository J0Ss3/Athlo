import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
};

export default function AdminActionCard({ title, icon, color, route }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={() => router.push(route as any)}
    >
      <Ionicons name={icon} size={28} color="white" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});

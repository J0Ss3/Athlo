import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AdminHeader from "@/components/admin/AdminHeader";
import CanchasEmptyState from "@/components/admin/CanchasEmptyState";
import styles from "@/styles/mis-canchas.styles";

export default function MisCanchasScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Mis Canchas" />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.sectionTitle}>Mis Canchas</Text>

          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Agregar cancha</Text>
          </TouchableOpacity>
        </View>

        <CanchasEmptyState />
      </View>
    </SafeAreaView>
  );
}
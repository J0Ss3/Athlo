import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import AdminActionCard from "@/components/admin/AdminActionCard";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminQuickStat from "@/components/admin/AdminQuickStat";
import { useAuth } from "@/providers/auth-provider";
import styles from "@/styles/admin.styles";

export default function Admin() {
  const { session } = useAuth();
  const normalizedRole = session?.user.roleName?.toLowerCase();

  if (normalizedRole !== "admin" && normalizedRole !== "provider") {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <AdminHeader title="Panel de Administrador" />

      <Text style={styles.subtitle}>¿Qué deseas administrar?</Text>

      <View style={styles.grid}>
        <AdminActionCard
          title="Resumen"
          icon="grid-outline"
          color="#7b2ff7"
          route="/(tabs)/resumen"
        />
        <AdminActionCard
          title="Canchas"
          icon="business-outline"
          color="#2563eb"
          route="/(tabs)/mis-canchas"
        />
        <AdminActionCard
          title="Reservas"
          icon="clipboard-outline"
          color="#f97316"
          route="/(tabs)/reservas"
        />
        <AdminActionCard
          title="Finanzas"
          icon="cash-outline"
          color="#16a34a"
          route="/(tabs)/finanzas"
        />
      </View>

      <TouchableOpacity style={styles.permisos}>
        <Ionicons name="shield-checkmark-outline" size={30} color="white" />
        <Text style={styles.permisosText}>Permisos</Text>
      </TouchableOpacity>

      <View style={styles.quick}>
        <Text style={styles.quickTitle}>Vista rápida</Text>
        <View style={styles.quickRow}>
          <AdminQuickStat label="Canchas" value="0" />
          <AdminQuickStat label="Reservas" value="0" />
          <AdminQuickStat label="Ingresos" value="L0" />
        </View>
      </View>
    </View>
  );
}

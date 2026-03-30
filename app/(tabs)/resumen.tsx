import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AdminHeader from "@/components/admin/AdminHeader";
import ResumenStatCard from "@/components/admin/ResumenStatCard";
import styles from "@/styles/resumen.styles";

export default function ResumenScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Resumen" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Resumen General</Text>

        <View style={styles.grid}>
          <ResumenStatCard
            label="Ingresos Totales"
            value="L 0.00"
            icon={<Feather name="dollar-sign" size={22} color="#17A34A" />}
            iconBgColor="#DDF5E4"
          />
          <ResumenStatCard
            label="Reservas Totales"
            value="0"
            icon={<AntDesign name="calendar" size={20} color="#F57C00" />}
            iconBgColor="#FFE4CC"
          />
          <ResumenStatCard
            label="Canchas Activas"
            value="0"
            icon={<MaterialCommunityIcons name="storefront-outline" size={22} color="#2563EB" />}
            iconBgColor="#DCE8FF"
          />
          <ResumenStatCard
            label="Pendiente de Pago"
            value="L 0.00"
            icon={<Feather name="dollar-sign" size={22} color="#C58A00" />}
            iconBgColor="#F8EDB8"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
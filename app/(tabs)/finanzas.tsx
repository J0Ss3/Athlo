import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AdminHeader from "@/components/admin/AdminHeader";
import FinanzasDetailCard from "@/components/finanzas/FinanzasDetailCard";
import FinanzasHeroCard from "@/components/finanzas/FinanzasHeroCard";
import FinanzasPendingCard from "@/components/finanzas/FinanzasPendingCard";
import styles from "@/styles/finanzas.styles";

export default function FinanzasScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Finanzas" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Finanzas</Text>

        <FinanzasHeroCard amount="L 0.00" subtitle="Pagos confirmados" />

        <FinanzasDetailCard
          cashValue="L 0.00"
          cardValue="L 0.00"
          totalValue="L 0.00"
        />

        <FinanzasPendingCard amount="L 0.00" subtitle="0 reservas pendientes" />
      </ScrollView>
    </SafeAreaView>
  );
}
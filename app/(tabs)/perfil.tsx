import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

import ProfileActionItem from "@/components/perfil/profileActionItem";
//import ReservationItem from "@/components/perfil/reservationItem";
import styles from "@/styles/perfil.styles";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4_Lw65lPJm8QgePbVKtds0OCvCb3EICxxfg&s",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Nombre Usuario</Text>
        <Text style={styles.username}>usuario@email.com</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Opciones</Text>
          <ProfileActionItem
            label="Métodos de Pago"
            onPress={() => router.push("/(tabs)/pagos")}
          />
          <ProfileActionItem
            label="Configuración"
            onPress={() => router.push("/(tabs)/ajustes")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

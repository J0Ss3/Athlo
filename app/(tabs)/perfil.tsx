import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ProfileActionItem from "@/components/perfil/profileActionItem";
import { useAuth } from "@/providers/auth-provider";
import styles from "@/styles/perfil.styles";

export default function PerfilScreen() {
  const { logout, session } = useAuth();

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

        <Text style={styles.name}>{session?.user.userName || "Usuario Athlo"}</Text>
        <Text style={styles.username}>{session?.user.email || "Sin correo"}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Opciones</Text>
          <ProfileActionItem
            label="Métodos de pago"
            onPress={() => router.push("/(tabs)/pagos")}
          />
          <ProfileActionItem
            label="Configuración"
            onPress={() => router.push("/(tabs)/ajustes")}
          />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              logout();
              router.replace("/(auth)/login");
            }}
          >
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

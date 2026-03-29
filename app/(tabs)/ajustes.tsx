import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import styles from "@/styles/ajustes.styles";

export default function AjustesScreen() {
    async function handleLogout() {
      try {
        await AsyncStorage.removeItem("authToken");
        
        Alert.alert("Sesión cerrada", "Has cerrado sesión exitosamente");
        router.replace("/(auth)/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        Alert.alert("Error", "No se pudo cerrar la sesión");
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text style={styles.item}>Cuenta</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Editar perfil</Text>
        <Text style={styles.item}>Notificaciones</Text>
        <Text style={styles.item}>Privacidad</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.item, { color: "#D4183D", marginBottom: 0 }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.item}>Soporte</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Centro de ayuda</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Contacto", "Envíanos un correo a soporte@athlo.com")
          }
        >
          <Text>Terminos y condiciones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

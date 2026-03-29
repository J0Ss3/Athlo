import { SHA256 } from 'crypto-js';
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import authService from "@/services/other_services/auth.service";
import styles from "@/styles/login.styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {

    const hashedPassword = SHA256(password).toString();

    const payload = {
      email : email,
      password: hashedPassword
    }

    authService.login(payload).then((response) => {
      if(!response.hasError){
        router.replace("/(tabs)");
      }
    });
    
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo-athlo.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para reservar tu cancha</Text>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        placeholderTextColor="#9aa4b2"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        secureTextEntry
        placeholderTextColor="#9aa4b2"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

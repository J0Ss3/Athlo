import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image
         source={require("../../assets/images/logo-athlo.jpeg")}
         style={styles.logo}
       />


      {/* Texto bienvenida */}
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Inicia sesión para reservar tu cancha
      </Text>

      {/* Correo */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        placeholderTextColor="#9aa4b2"
      />

      {/* Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        secureTextEntry
        placeholderTextColor="#9aa4b2"
      />

      {/* Olvidé contraseña */}
      <TouchableOpacity>
        <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón login */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.divider}>O continúa con</Text>

      {/* Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>

      {/* Registro */}
      <Text style={styles.register}>
        ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#1e3557",
    padding:25,
    justifyContent:"center"
  },

  logo:{
    width:180,
    height:80,
    resizeMode:"contain",
    alignSelf:"center",
    marginBottom:20
  },

  title:{
    fontSize:28,
    color:"white",
    textAlign:"center",
    fontWeight:"bold"
  },

  subtitle:{
    color:"#cbd5e1",
    textAlign:"center",
    marginBottom:30
  },

  label:{
    color:"white",
    marginBottom:6
  },

  input:{
    backgroundColor:"#2f4a6b",
    padding:15,
    borderRadius:12,
    marginBottom:15,
    color:"white"
  },

  forgot:{
    color:"#ff5a00",
    textAlign:"right",
    marginBottom:20
  },

  button:{
    backgroundColor:"#ff5a00",
    padding:16,
    borderRadius:14,
    alignItems:"center",
    marginBottom:20
  },

  buttonText:{
    color:"white",
    fontWeight:"bold",
    fontSize:16
  },

  divider:{
    textAlign:"center",
    color:"#cbd5e1",
    marginBottom:10
  },

  googleButton:{
    backgroundColor:"white",
    padding:14,
    borderRadius:12,
    alignItems:"center",
    marginBottom:20
  },

  googleText:{
    fontWeight:"bold"
  },

  register:{
    color:"white",
    textAlign:"center"
  },

  registerLink:{
    color:"#ff5a00",
    fontWeight:"bold"
  }

});

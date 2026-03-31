
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
  ScrollView, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import AthloLogo from '@/components/common/AthloLogo';
import { API_URL, saveToken } from '@/lib/api';
import styles from '@/styles/login.styles';

type Mode = 'login' | 'register' | 'verify';

export default function LoginScreen() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [loading, setLoading] = useState(false);

  // ─── LOGIN ────────────────────────────────────────────────────
  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const json = await res.json();

      if (!res.ok || json.hasError) {
        Alert.alert('Error', json.message || 'Credenciales inválidas');
        return;
      }

      // Guardar token del header Authorization
      const authHeader = res.headers.get('Authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        await saveToken(token);
      }

      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Error', 'No se pudo conectar al servidor.\nVerifica que la IP en lib/api.ts sea correcta.');
    } finally {
      setLoading(false);
    }
  }

  // ─── REGISTRO ─────────────────────────────────────────────────
  async function handleRegister() {
    if (!email.trim() || !password.trim() || !userName.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          userName: userName.trim(),
          idRole: 2, // 2 = Cliente (ajusta según tu BD)
        }),
      });
      const json = await res.json();

      if (!res.ok || json.hasError) {
        Alert.alert('Error', json.message || 'Error al registrar usuario');
        return;
      }

      Alert.alert(
        '¡Cuenta creada!',
        'Se envió un código de verificación a tu correo.',
        [{ text: 'OK', onPress: () => setMode('verify') }]
      );
    } catch (e) {
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    } finally {
      setLoading(false);
    }
  }

  // ─── VERIFICAR CÓDIGO ─────────────────────────────────────────
  async function handleVerify() {
    if (!verifyCode.trim()) {
      Alert.alert('Error', 'Ingresa el código de verificación');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/email/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: verifyCode.trim() }),
      });
      const json = await res.json();

      if (!res.ok || json.hasError) {
        Alert.alert('Error', json.message || 'Código inválido');
        return;
      }

      Alert.alert('¡Verificado!', 'Ya puedes iniciar sesión.', [
        { text: 'OK', onPress: () => setMode('login') },
      ]);
    } catch (e) {
      Alert.alert('Error', 'No se pudo verificar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* LOGO SVG — reemplaza la Image anterior */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <AthloLogo width={160} height={80} />
        </View>

        {mode === 'login' && (
          <>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Inicia sesión para reservar tu cancha</Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#9aa4b2"
              autoCapitalize="none"
              keyboardType="email-address"
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

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Iniciar Sesión</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode('register')} style={{ marginTop: 16, alignItems: 'center' }}>
              <Text style={{ color: '#7AA7C7', fontWeight: '600' }}>
                ¿No tienes cuenta? <Text style={{ color: '#F45100' }}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}

        {mode === 'register' && (
          <>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Únete y reserva tu cancha favorita</Text>

            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="miusuario123"
              placeholderTextColor="#9aa4b2"
              autoCapitalize="none"
              value={userName}
              onChangeText={setUserName}
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#9aa4b2"
              autoCapitalize="none"
              keyboardType="email-address"
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

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Crear Cuenta</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode('login')} style={{ marginTop: 16, alignItems: 'center' }}>
              <Text style={{ color: '#7AA7C7', fontWeight: '600' }}>
                ¿Ya tienes cuenta? <Text style={{ color: '#F45100' }}>Iniciar sesión</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode('verify')} style={{ marginTop: 8, alignItems: 'center' }}>
              <Text style={{ color: '#7AA7C7', fontSize: 12 }}>Ya tengo código de verificación</Text>
            </TouchableOpacity>
          </>
        )}

        {mode === 'verify' && (
          <>
            <Text style={styles.title}>Verificar Correo</Text>
            <Text style={styles.subtitle}>Ingresa el código enviado a {email}</Text>

            <Text style={styles.label}>Código de verificación (6 dígitos)</Text>
            <TextInput
              style={styles.input}
              placeholder="123456"
              placeholderTextColor="#9aa4b2"
              keyboardType="number-pad"
              maxLength={6}
              value={verifyCode}
              onChangeText={setVerifyCode}
            />

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleVerify}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Verificar</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode('login')} style={{ marginTop: 16, alignItems: 'center' }}>
              <Text style={{ color: '#7AA7C7' }}>Volver al login</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

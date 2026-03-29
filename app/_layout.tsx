import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar style="auto" />
        <Redirect href="/(auth)/login" />
      </>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cancha/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
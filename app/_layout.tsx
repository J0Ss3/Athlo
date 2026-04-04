import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@/providers/auth-provider";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...AntDesign.font,
    ...Ionicons.font,
    ...MaterialIcons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cancha/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

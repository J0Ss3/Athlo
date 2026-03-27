import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  // TODO: Replace with real auth check (e.g. from context/store)
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="cancha/[id]" />
        </Stack>
        <Redirect href="/(auth)/login" />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cancha/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

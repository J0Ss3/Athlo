import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppTheme } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppTheme.colors.primary,
        tabBarInactiveTintColor: AppTheme.colors.textSoft,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reservas"
        options={{
          title: "Reservas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="person.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="pagos"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="ajustes"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="shield.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="finanzas"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="mis-canchas"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="mis-reservas"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="resumen"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

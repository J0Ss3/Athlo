import { AppTheme } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View
      style={{
        backgroundColor: AppTheme.colors.white,
        borderRadius: 20,
        height: 46,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginBottom: 20,
      }}
    >
      <MaterialIcons name="search" size={20} color="#A0A7B4" />
      <TextInput
        placeholder="Buscar cancha"
        placeholderTextColor="#A0A7B4"
        style={{
          marginLeft: 8,
          flex: 1,
          color: AppTheme.colors.text,
        }}
      />
    </View>
  );
}

import { AppTheme } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
};

export default function ProfileActionItem({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: "#EEF1F4",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: AppTheme.colors.text,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
        <MaterialIcons name="chevron-right" size={22} color="#8E8E93" />
      </View>
    </TouchableOpacity>
  );
}

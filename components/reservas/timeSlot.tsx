import { AppTheme } from "@/constants/theme";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  active?: boolean;
  disabled?: boolean;
};

export default function TimeSlot({ label, active, disabled }: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        width: "22%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: disabled
          ? AppTheme.colors.disabled
          : active
            ? AppTheme.colors.primary
            : "#F78B2D",
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          color: disabled ? "#8E8E93" : AppTheme.colors.white,
          fontWeight: "700",
          fontSize: 13,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

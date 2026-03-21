import { AppTheme } from "@/constants/theme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  actionText?: string;
};

export default function SectionHeader({ title, actionText }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: AppTheme.colors.text,
        }}
      >
        {title}
      </Text>

      {actionText ? (
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: "#7AA7C7",
              fontWeight: "600",
            }}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

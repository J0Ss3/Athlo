import { AppTheme } from "@/constants/theme";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export default function FeaturedCourtCard({ title, subtitle, image }: Props) {
  return (
    <TouchableOpacity
      style={{
        width: 140,
        backgroundColor: AppTheme.colors.white,
        borderRadius: 18,
        marginRight: 14,
        overflow: "hidden",
      }}
    >
      <Image source={{ uri: image }} style={{ width: "100%", height: 110 }} />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "700",
            color: AppTheme.colors.text,
            fontSize: 15,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: AppTheme.colors.textMuted,
            fontSize: 13,
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

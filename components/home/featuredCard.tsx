import { AppTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  onPress?: () => void;
};

export default function FeaturedCourtCard({
  title,
  subtitle,
  image,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={12} color="#F4A261" />
            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 160,
    borderRadius: 18,
    marginRight: 14,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 18,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontWeight: "800",
    color: AppTheme.colors.white,
    fontSize: 15,
    marginBottom: 3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
  },
});
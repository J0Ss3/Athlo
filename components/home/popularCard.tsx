import { AppTheme } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  price: string;
  location: string;
  type: string;
  rating: string;
  image: string;
  onPress?: () => void;
};

export default function PopularCourtCard({
  price,
  location,
  type,
  rating,
  image,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        <Pressable style={styles.heartButton}>
          <MaterialIcons name="favorite-border" size={16} color="#8E8E93" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.price}>{price}</Text>

        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={13} color="#9AA4B2" />
          <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{type}</Text>
          </View>

          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={14} color="#F5A623" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 175,
    backgroundColor: AppTheme.colors.white,
    borderRadius: 18,
    marginRight: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 115,
  },
  heartButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: AppTheme.colors.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  content: {
    padding: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    marginLeft: 3,
    color: "#7B8794",
    fontSize: 11,
    flex: 1,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    backgroundColor: "#EBF5FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontWeight: "700",
    color: AppTheme.colors.text,
    fontSize: 13,
  },
});
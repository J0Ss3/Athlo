import { AppTheme } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  price: string;
  location: string;
  type: string;
  rating: string;
  image: string;
};

export default function PopularCourtCard({
  price,
  location,
  type,
  rating,
  image,
}: Props) {
  return (
    <TouchableOpacity
      style={{
        width: 170,
        backgroundColor: AppTheme.colors.white,
        borderRadius: 18,
        marginRight: 14,
        overflow: "hidden",
      }}
    >
      <View>
        <Image source={{ uri: image }} style={{ width: "100%", height: 110 }} />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            backgroundColor: AppTheme.colors.white,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="favorite-border" size={18} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: AppTheme.colors.text,
          }}
        >
          {price}
        </Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
        >
          <MaterialIcons name="location-on" size={14} color="#9AA4B2" />
          <Text style={{ marginLeft: 4, color: "#7B8794", fontSize: 12 }}>
            {location}
          </Text>
        </View>

        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4AA3DF", fontWeight: "600", fontSize: 13 }}>
            {type}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="star" size={14} color="#F5A623" />
            <Text
              style={{
                marginLeft: 4,
                fontWeight: "600",
                color: AppTheme.colors.text,
              }}
            >
              {rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

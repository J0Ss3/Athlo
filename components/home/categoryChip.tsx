import { AppTheme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryChipProps {
  label: string;
  emoji: string;
  color?: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryChip({
  label,
  emoji,
  color = "#2A5A90",
  isActive = false,
  onPress,
}: CategoryChipProps) {

  const convertHtmlEntityToEmoji = (entity: string) => {
    if (entity.startsWith('&#')) {
      const match = entity.match(/&#(\d+);/);
      if (match && match[1]) {
        const code = parseInt(match[1], 10);
        if (!isNaN(code) && code >= 0 && code <= 0x10FFFF) {
          return String.fromCodePoint(code);
        }
      }
    }
    return entity;
  };

  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.emojiWrapper, { backgroundColor: color }]}>
        <Text style={styles.emoji}>{convertHtmlEntityToEmoji(emoji)}</Text>
      </View>
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    paddingVertical: 10,
    borderRadius: AppTheme.radius.md,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: AppTheme.radius.md,
  },
  emojiWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  emoji: {
    fontSize: 22,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  labelActive: {
    color: AppTheme.colors.white,
    fontWeight: "700",
  },
});

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

const MAPPING = {
  "house.fill": "home",
  "person.fill": "person",
  "chevron.right": "chevron-right",
  "shield.fill": "shield",
  calendar: "calendar-today",
} as const;

type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}

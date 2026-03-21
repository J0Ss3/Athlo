import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: AppTheme.colors.text,
    marginBottom: 18,
  },
  card: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: 18,
    padding: 16,
    ...AppTheme.shadow.card,
  },
  item: {
    fontSize: 16,
    color: AppTheme.colors.text,
    marginBottom: 12,
  },
});

export default styles;

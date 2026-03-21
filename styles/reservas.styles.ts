import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: AppTheme.colors.white,
    textAlign: "center",
  },
  hero: {
    backgroundColor: AppTheme.colors.secondaryBlue,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginTop: 16,
  },
  card: {
    backgroundColor: AppTheme.colors.card,
    marginTop: -18,
    borderRadius: 24,
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "700",
    color: AppTheme.colors.text,
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: AppTheme.colors.textMuted,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: AppTheme.colors.text,
    marginTop: 18,
    marginBottom: 14,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  reserveButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  reserveButtonText: {
    color: AppTheme.colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default styles;

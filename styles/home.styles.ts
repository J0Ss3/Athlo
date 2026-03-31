import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.backgroundDark,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: AppTheme.colors.white,
    fontStyle: "italic",
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppTheme.colors.white,
    marginBottom: 12,
    marginTop: 8,
  },
  errorBanner: {
    backgroundColor: "rgba(244, 81, 0, 0.18)",
    color: "#FFD7C7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  categoriesRow: {
    marginBottom: 20,
  },
  sectionHeaderDark: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitleDark: {
    fontSize: 20,
    fontWeight: "800",
    color: AppTheme.colors.white,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7AA7C7",
  },
  sectionHeaderLight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitleLight: {
    fontSize: 22,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  sectionActionLight: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7AA7C7",
  },
  carouselDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 26,
  },
  dotActive: {
    width: 22,
    height: 6,
    borderRadius: 10,
    backgroundColor: AppTheme.colors.white,
    marginHorizontal: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#7A94B8",
    marginHorizontal: 4,
  },
  sectionWhite: {
    backgroundColor: AppTheme.colors.background,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    minHeight: 400,
  },
});

export default styles;

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
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: AppTheme.colors.white,
    marginBottom: 16,
    marginTop: 10,
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

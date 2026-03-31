import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  header: {
    backgroundColor: AppTheme.colors.secondaryBlueLight,
    height: 210,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    paddingTop: 24,
  },
  headerTitle: {
    color: AppTheme.colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 14,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: AppTheme.colors.white,
    marginBottom: 10,
  },
  name: {
    color: AppTheme.colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
  username: {
    color: "#DDF6FF",
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    padding: 20,
    marginTop: -24,
  },
  cardSection: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: AppTheme.colors.text,
    marginBottom: 14,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkText: {
    color: "#7AA7C7",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 18,
    backgroundColor: "#F45100",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: {
    color: AppTheme.colors.white,
    fontWeight: "700",
    fontSize: 15,
  },
});

export default styles;

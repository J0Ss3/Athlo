import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.secondaryBlue,
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: AppTheme.colors.white,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#D5DFEA",
    textAlign: "center",
    marginBottom: 28,
  },
  label: {
    color: AppTheme.colors.white,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#234B7D",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: AppTheme.colors.white,
    marginBottom: 14,
  },
  forgot: {
    color: AppTheme.colors.primary,
    textAlign: "right",
    marginBottom: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: AppTheme.colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    color: "#FFD1D1",
    marginBottom: 12,
    textAlign: "center",
  },
});

export default styles;

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  topContent: {
    width: "100%",
    alignItems: "center",
  },
  avatarContainer: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 24,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 0,
    marginHorizontal: 40,
    marginBottom: 32,
  },
  primaryButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#6C5CE7",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5EA",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#8E8E93",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    width: "100%",
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  ButtonGroup: {
    width: "100%",
  },
  socialIconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  footerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  signInText: {
    color: "#6C5CE7",
    fontWeight: "600",
  },
});
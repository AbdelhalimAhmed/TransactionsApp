import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../attributes";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.l,
  },
  header: {
    marginVertical: SPACING.xxl,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
  },
  dateInput: {
    alignSelf: "center",
  },
  dropDownContainer: {
    zIndex: 5000,
    marginBottom: SPACING.xs,
  },
  dropDown: {
    borderColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
});

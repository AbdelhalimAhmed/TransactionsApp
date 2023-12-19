import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, SPACING } from "../../attributes";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    margin: SPACING.xs,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    gap: SPACING.xs,
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const COLORS = {
  black: "#000",
  white: "#fff",
  silver: "#BDBDBD",
  grey: "#757575",
  red: "#F44336",
  primary: "#5F8670",
  border: "rgb(216, 216, 216)",
};

export const THEME = {
  defaultTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...COLORS,
      transactionCardBg: "#FFF",
    },
  },
  darkTheme: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...COLORS,
      transactionCardBg: "rgb(18, 18, 18)",
    },
  },
};

export type CustomTheme = {
  colors: {
    transactionCardBg: string;
  } & typeof COLORS;
} & Theme;
export type Color = keyof CustomTheme["colors"];

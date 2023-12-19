import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../attributes/theme";

// custom hook for using current theme 'dark' or 'default
const useCurrentTheme = () => {
  const { colors, dark } = useTheme() as CustomTheme;

  return {
    colors,
    dark,
  };
};

export default useCurrentTheme;

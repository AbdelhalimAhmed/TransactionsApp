import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "./RootNavigator";
import ROUTES from "./routes";

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROUTES
>["navigation"];

export const useAppNavigation = () => useNavigation<NavigationProps>();

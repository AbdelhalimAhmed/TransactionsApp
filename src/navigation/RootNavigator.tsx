import React from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Transactions from '../screens/Transactions';
import CreateTransaction from '../screens/CreateTransaction';
import ROUTES from './routes';


export type RootStackParamList = {
  Transactions: undefined;
  CreateTransaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName={ROUTES.SYMPTOMS}>
      <Stack.Screen
        name={ROUTES.SYMPTOMS}
        component={Transactions}
        options={{
          headerTitle: 'Your Transactions',
          headerTintColor: colors.primary
        }}
      />
      <Stack.Screen
        name={ROUTES.CREATE_SYMPTOM}
        component={CreateTransaction}
        options={({ navigation }) => ({
          headerTitle: 'Create Transaction',
          headerTintColor: colors.primary,
          presentation: 'modal',
          statusBarStyle: 'light',
          headerRight: () => (
            <Ionicons
              onPress={navigation.goBack}
              suppressHighlighting={true}
              name="close"
              size={32}
              color={colors.primary}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

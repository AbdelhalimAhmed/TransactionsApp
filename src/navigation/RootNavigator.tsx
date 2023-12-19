import React from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ROUTES from './routes';
import { StyledText } from '../components';
import Transactions from '../screens/Transactions';
import CreateTransaction from '../screens/CreateTransaction';
import TransactionsSummary from '../screens/TransactionsSummary';


export type RootStackParamList = {
  Transactions: undefined;
  CreateTransaction: undefined;
  TransactionsSummary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName={ROUTES.TRANSACTIONS}>
      <Stack.Screen
        name={ROUTES.TRANSACTIONS}
        component={Transactions}
        options={({ navigation }) => ({
          headerTitle: 'Your Transactions',
          headerTintColor: colors.primary,
          headerRight: () => {
            return <StyledText color='primary' size='s' onPress={() => navigation.navigate(ROUTES.TRANSACTIONS_SUMMARY)}>Summary</StyledText>
          }
        })
        }
      />
      <Stack.Screen
        name={ROUTES.TRANSACTIONS_SUMMARY}
        component={TransactionsSummary}
        options={{
          headerTitle: 'Monthly Transactions Summary',
          headerTintColor: colors.primary,
          presentation: 'modal',
          statusBarStyle: 'light',
        }}
      />
      <Stack.Screen
        name={ROUTES.CREATE_TRANSACTION}
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

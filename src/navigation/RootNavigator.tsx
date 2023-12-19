import React from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Symptoms from '../screens/Symptoms';
import CreateSymptom from '../screens/CreateSymptom';
import ROUTES from './routes';


export type RootStackParamList = {
  Symptoms: undefined;
  CreateSymptom: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName={ROUTES.SYMPTOMS}>
      <Stack.Screen
        name={ROUTES.SYMPTOMS}
        component={Symptoms}
        options={{
          headerTitle: 'Your Symptoms',
          headerTintColor: colors.primary
        }}
      />
      <Stack.Screen
        name={ROUTES.CREATE_SYMPTOM}
        component={CreateSymptom}
        options={({ navigation }) => ({
          headerTitle: 'Create Symptom',
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

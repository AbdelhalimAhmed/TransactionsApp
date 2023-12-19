import 'react-native-gesture-handler';

import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigator from './src/navigation/RootNavigator';
import { THEME } from './src/attributes';
import { persistor, store } from './src/store'


export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={isDarkMode ? THEME.darkTheme : THEME.defaultTheme}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

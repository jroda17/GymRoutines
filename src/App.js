import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

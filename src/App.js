import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import configureStore from './store/store';

export default function App() {
  return (
    <Provider store={configureStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

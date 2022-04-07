import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signUp';
import LogIn from '../screens/logIn';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

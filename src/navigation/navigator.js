import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signUp';
import LogIn from '../screens/logIn';
import auth from '@react-native-firebase/auth';
import MainTabNavigator from './mainTabNavigator';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  return (
    <>
      {user ? (
        <MainTabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LogIn}
            options={{
              headerTitle: '',
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

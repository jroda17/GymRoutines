import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signUp';
import LogIn from '../screens/logIn';
import auth from '@react-native-firebase/auth';
import MainTabNavigator from './mainTabNavigator';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, deleteUser} from '../store/actions';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    auth().onAuthStateChanged(userState => {
      if (userState?.emailVerified) {
        dispatch(setUser(getData()));
      } else {
        dispatch(deleteUser());
      }
    });
  }, []);

  const getData = async () => {
    return await firestore()
      .collection('users')
      .where('id', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          return doc.data();
        });
      });
  };
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

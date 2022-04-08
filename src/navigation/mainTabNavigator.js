import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import RoutinesScreen from '../screens/routines';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileScreen from '../screens/profile';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutinesScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="list" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Health"
        component={RoutinesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="apple-alt" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user-alt" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

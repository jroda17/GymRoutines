import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';

export default function LogIn() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView style={{paddingTop: headerHeight}}>
      <Input placeholder="Password" secureTextEntry={true} />
      <Input
        placeholder="Comment"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Button title="Registrarte" onPress={navigateToSignup} />
    </KeyboardAvoidingView>
  );
}

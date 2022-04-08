import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';

export default function LogIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  const login = async () => {
    try {
      const ans = await auth().signInWithEmailAndPassword(email, password);
      if (ans.user.emailVerified) {
        console.log(ans);
      } else {
        ans.user.sendEmailVerification();
        auth().signOut()
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <KeyboardAvoidingView
      style={[styles.container, {paddingTop: headerHeight}]}>
      <Input
        placeholder="mail@mail.com"
        label="Correo Electronico"
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
        leftIcon={<Icon name="envelope" size={15} color="black" />}
      />
      <Input
        label="Contraseña"
        placeholder="********"
        leftIcon={<Icon name="key" size={15} color="black" />}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={login} />
      <Button title="Registrarte" onPress={navigateToSignup} />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

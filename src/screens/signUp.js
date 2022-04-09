import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {validateEmail, validatePassword} from '../constants/regex';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({
    mail: false,
    password: false,
  });
  const navigate = useNavigation();

  const handleRegister = () => {
    const emailValidation = !validateEmail(email);
    const passwordValidation = !validatePassword(password);
    if (emailValidation || passwordValidation) {
      setError({
        mail: emailValidation,
        password: passwordValidation,
      });
      Snackbar.show({
        text: 'No cumple con los requisitos',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    register();
  };

  const register = async () => {
    try {
      let ans = await auth().createUserWithEmailAndPassword(
        email.toLocaleLowerCase(),
        password,
      );
      if (ans) {
        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        Snackbar.show({
          text: 'Email de verificacion enviado',
          duration: Snackbar.LENGTH_LONG,
        });
        navigate.goBack();
      }
    } catch (error) {
      console.log(error.message);
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={styles.container}>
        <View>
          <Input
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            leftIcon={<Icon name="envelope" size={24} color="black" />}
            keyboardType="email-address"
            autoCompleteType={'email'}
            autoCapitalize={'none'}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            leftIcon={<Icon name="key" size={24} color="black" />}
          />
        </View>
        <Button title="Registrarte" onPress={handleRegister} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal:50
  },
});

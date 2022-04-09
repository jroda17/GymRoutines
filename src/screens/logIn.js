import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';
import {validatePassword, validateEmail} from '../constants/regex';
import Snackbar from 'react-native-snackbar';

export default function LogIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secure, setSecure] = React.useState({
    enabled: true,
    icon: 'eye',
  });
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [error, setError] = React.useState({
    mail: false,
    password: false,
  });

  React.useEffect(() => {
    setError({
      mail: false,
      password: false,
    });
  }, [email, password]);

  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  const handleSecureEntry = () => {
    if (secure.enabled) {
      setSecure({
        enabled: false,
        icon: 'eye-slash',
      });
    } else {
      setSecure({
        enabled: true,
        icon: 'eye',
      });
    }
  };

  const login = async () => {
    Keyboard.dismiss();
    const emailValidation = !validateEmail(email);
    const passwordValidation = !validatePassword(password);
    if (emailValidation || passwordValidation) {
      setError({
        mail: emailValidation,
        password: passwordValidation,
      });
      Snackbar.show({
        text: 'Verifica los datos.',
        duration: Snackbar.LENGTH_LONG,
      });
      passwordRef.current.shake();
      emailRef.current.shake();
      return;
    }
    try {
      const ans = await auth().signInWithEmailAndPassword(email, password);
      if (!ans.user.emailVerified) {
        ans.user.sendEmailVerification();
        auth().signOut();
        Snackbar.show({
          text: 'Verifica el mail antes de continuar',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      console.log(error.message);
      Snackbar.show({
        text: 'Ocurrio un error. Intenta de nuevo',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={[styles.container, {paddingTop: headerHeight}]}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View>
            <Input
              placeholder="mail@mail.com"
              label="Correo Electronico"
              onChangeText={text => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              leftIcon={<Icon name="envelope" size={15} color="black" />}
              autoComplete="email"
              returnKeyType="next"
              onEndEditing={() => passwordRef.current.focus()}
              ref={emailRef}
            />
            <Input
              label="Contraseña"
              placeholder="********"
              leftIcon={<Icon name="key" size={15} color="black" />}
              rightIcon={
                <TouchableWithoutFeedback onPress={handleSecureEntry}>
                  <Icon name={secure.icon} size={15} color="grey" />
                </TouchableWithoutFeedback>
              }
              onChangeText={text => setPassword(text)}
              secureTextEntry={secure.enabled}
              ref={passwordRef}
              onSubmitEditing={login}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={login} />
            <Button title="Registrarte" onPress={navigateToSignup} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    height: 100,
    justifyContent: 'space-around',
  },
});

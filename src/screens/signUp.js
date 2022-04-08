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

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({
    mail: false,
    password: false,
  });

  const handleRegister = () => {
    // if (!validateEmail(email)) setError({...error, mail: true});
    // if (!validatePassword(password)) setError({...error, password: true});
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
      }
    } catch (error) {
      console.log(error.message);
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
            placeholder="Comment"
            onChangeText={text => setEmail(text)}
            leftIcon={<Icon name="user" size={24} color="black" />}
            keyboardType="email-address"
            autoCompleteType={'email'}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            leftIcon={<Icon name="user" size={24} color="black" />}
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
    justifyContent: 'center',
  },
});

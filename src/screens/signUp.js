import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
      let ans = await auth().createUserWithEmailAndPassword(email.toLocaleLowerCase(), password);
      if (ans) {
        console.log(ans);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Comment"
        onChangeText={text => setEmail(text)}
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Button title="Registrarte" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

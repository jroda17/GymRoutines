import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen() {
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={'Cerrar Sesion'} onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

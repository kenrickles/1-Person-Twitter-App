import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Screen from '../components/Screen.jsx';
import { Text } from 'react-native';

export default function WelcomeScreen() {
  // defining navigation to use react-navigator
  const navigation = useNavigation();
  return (
    <Screen style={styles.WelcomeScreen}>
      <Text style={styles.titleText}> 1-Person Twitter App</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={() => {navigation.navigate('Login');}} 
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.registerButtonContainer}
          onPress={() => {navigation.navigate('Register');}} 
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      
    </Screen>
  );
}

const styles = StyleSheet.create({
  WelcomeScreen: {
    marginTop: 50,
  },
  titleText: {
    alignSelf: 'center'
  },
  loginButtonContainer: {
    backgroundColor: '#4ae1b0',
    width: 303,
    height: 52,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 400,
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0.34,
    textAlign: 'center',
    color: '#ffffff'
  },
  registerButtonContainer: {
    backgroundColor: '#ed4c59',
    width: 303,
    height: 52,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
});
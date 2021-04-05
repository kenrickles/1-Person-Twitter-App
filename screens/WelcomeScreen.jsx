import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Platform, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Screen from '../components/Screen.jsx';
import firebase from '../database/firebase.js';

// store async data
const storeData = async (uid) => {
  await AsyncStorage.setItem('currentUid', uid);

};

export default function WelcomeScreen() {
  // defining navigation to use react-navigator
  const navigation = useNavigation();
  const email = 'jenny@gmail.com';
  const password = '12345678';
  // demo-login handler
  const demoLoginHandler = () => {
    // Firebase Auth
    firebase.auth().signInWithEmailAndPassword(email, password).then( (res) => {
      console.log('User logged-in successfully authenticated!');
      storeData(res.user.uid);
      navigation.navigate('Home');
    }).catch (error => {
      console.log(error);
    });
  };

  return (
    <Screen>
      <View style={styles.WelcomeScreen}>
        <Text style={styles.titleText}> 1-Person Twitter App</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={() => {navigation.navigate('Login');}} 
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.registerButtonContainer}
          onPress={() => {navigation.navigate('Register');}} 
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.demoLoginButtonContainer}
          onPress={demoLoginHandler} 
        >
          <Text style={styles.buttonText}>DEMO LOGIN</Text>
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
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica Neue',
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
  demoLoginButtonContainer: {
    backgroundColor: 'purple',
    width: 303,
    height: 52,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
});
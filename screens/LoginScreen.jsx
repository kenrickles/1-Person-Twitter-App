import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../components/Screen.jsx';
import firebase from '../database/firebase.js';



export default function LoginScreen() {

  // defining navigation to use react-navigator
  const navigation = useNavigation();

  // declaration of state
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // user login with Firebase Auth
  const userLoginHandler = () => {
    // validation for non-empty fields before processing Firebase Auth
    if (email === '' && password === ''){
      // if both email and password are blank, ask user to enter details
      Alert.alert('Please Enter Details to Login');
    }
    if (email === '' && password !== ''){
      // if email is blank but password is not blank, ask user to enter email
      Alert.alert('Please Enter Email to Login');
    }
    if (email !== '' && password === '' ){
      // if password is blank but email is not blank, ask user to enter password
      Alert.alert('Please Enter Password to Login');
    }
    // else we proceed with Firebase Auth
    else {
      // display loading spinner (acitivityIndicator)
      setIsLoading(true);
      // Firebase Auth
      firebase.auth().signInWithEmailAndPassword(email, password).then( (res) => {
        console.log('User logged-in successfully authenticated!');
      }).catch (error => {
        setIsLoading(false);
        setErrorPresent(true);
        console.log(errorMessage);
        setErrorMessage('Invalid Username or password. Please try again');
      });
    }
  };
  // loading spinner when request is made to firebase, so users will get feedback when they confirm login 
  if(isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    );
  } 
  return (
    <Screen style={styles.LoginScreen}>
      {errorPresent && (<Text style={styles.errorMessage}>
        {errorMessage}
      </Text>)}
      <View style={styles.TextInputContainer}>
        <MaterialCommunityIcons name="email" size={30} color="lightgrey"></MaterialCommunityIcons>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        > 
        </TextInput>
      </View>
      <View style={styles.TextInputContainer}>
        <MaterialCommunityIcons name="lock" size={30} color="lightgrey"></MaterialCommunityIcons>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          maxLength={15}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={userLoginHandler} 
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signupText} onPress={() => {navigation.navigate('Register');}} >
        Don't have an account? Click here to sign up
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  LoginScreen:{
    marginTop: 200,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  errorMessage: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'red',
  },
  TextInputContainer:{
    flexDirection:'row',
    padding: 20,
    marginLeft: 10,
  },
  inputText: {
    width: '75%',
    marginLeft: 15,
    marginBottom: 15,
    paddingBottom: 15,
    fontSize: 18,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  loginButtonContainer: {
    backgroundColor: '#4ae1b0',
    width: 293,
    height: 52,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0.34,
    textAlign: 'center',
    color: '#ffffff'
  },
  signupText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },

});
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen.jsx';
import firebase from '../database/firebase.js';

export default function RegisterScreen() {
  // defining navigation to use react-navigator
  const navigation = useNavigation();

  // declaration of react states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // firebase request + simple app side validation
  const registerUserHandler = () => {
    if (email === '' || name === '' || password === '' || confirmPassword === '') {
      Alert.alert('Please fill in details to register');
    } else {
      setIsLoading(true);

      // user creation in firebase authenthication
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('inside fb auth');
          // after creating firebase auth, create the user in firestore
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
            name: name,
            handle: handle,
            createdAt: new Date(),
          });
          console.log('User registered successfully!');
          setIsLoading(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setName('');
          navigation.navigate('Login');
        })
        .catch(error => {setErrorMessage(error);});      
    }
  };

  // loading spinner when request is made to firebase, so users will get feedback when they register
  if(isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    );
  } 
  return (
    <Screen style={styles.RegisterScreen}>
      <View style={styles.TextInputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        > 
        </TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Handle"
          value={handle}
          onChangeText={setHandle}
        > 
        </TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        > 
        </TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        > 
        </TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        > 
        </TextInput>
      </View>
      <View>
        <TouchableOpacity
          style={styles.registerButtonContainer}
          onPress={registerUserHandler} 
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <Text style={styles.signupText} onPress={() => {navigation.navigate('Login');}}>
        Already have an account? Click here to login
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  RegisterScreen: {
    marginTop: 200
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
  TextInputContainer:{
    padding: 10,
    marginTop: -100,
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
  registerButtonContainer: {
    backgroundColor: '#ed4c59',
    width: 303,
    height: 52,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
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
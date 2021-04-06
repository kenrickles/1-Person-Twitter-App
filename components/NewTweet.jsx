import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Separator from './Separator.jsx';
import firebase from '../database/firebase.js';


export default function NewTweet() {
  // declaration of react state
  const [newTweet, setNewTweet] = useState('');
  const [currentUid, setCurrentUid] = useState('');

  // useEffect to return current Uid from local storage
  useEffect(() => {
    const getData = async () => {
      const currentUidRetrieval = await AsyncStorage.getItem('currentUid');
      setCurrentUid(currentUidRetrieval);
    };
    getData();
  }, []);
  // on user submisson of new tweet
  const onSubmitHandler =  async () => {
    // prevents user from sending blank tweets
    if (newTweet.length === 0) {
      console.log('nothing sent');
    } else {
      // firebase request to firestore to store a new tweet and having a uniquely generated firestore key for the document name
      firebase.firestore().collection('tweetsBy').doc(currentUid).collection('tweets').doc().set({
        createdAt: new Date(), 
        message: newTweet,
      });
      // reset the new tweet input
      setNewTweet('');
    }
  };

  return (
    <>
      <Separator />
      <View style={styles.container}>
        <TextInput 
          placeholder="What's happening? Enter a new tweet.."
          value={newTweet}
          onChangeText={setNewTweet}
          multiline={true}
          numberOfLines={10}
          style={styles.newTweetText}
          maxLength={280}
        >
        </TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={onSubmitHandler}
          >
            <Text style={styles.buttonText}> Tweet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Separator />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: 'flex-start',
    height: 'auto',
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  newTweetText:{
    width: '90%',
    fontSize: 15,
    fontFamily: 'Helvetica Neue'
    
  },
  buttonContainer:{
    marginTop: 10,
    alignSelf: 'flex-end',
    borderWidth: 1,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#1DA1F2',
    marginRight: 20,
    marginBottom: 10,
    borderColor: '#fff'
  },
  buttonText: {
    alignSelf:'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica Neue',
  },
});
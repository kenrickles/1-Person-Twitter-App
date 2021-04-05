import React from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Separator from './Separator.jsx';

export default function NewTweet({ newTweet, setNewTweet }) {


  return (
    <>
      <Separator />
      <View style={styles.container}>
        <TextInput 
          placeholder="What's happening? Enter a new tweet.."
          value={newTweet}
          onChange={setNewTweet}
          multiline="true"
          numberOfLines={10}
          style={styles.newTweetText}
        >
        </TextInput>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}> Tweet</Text>
      </TouchableOpacity>
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
    width: 80,
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
    fontFamily: 'Helvetica Neue',
  },
});
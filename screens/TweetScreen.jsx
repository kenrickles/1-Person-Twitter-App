import React from 'react';

import Tweet from '../components/Tweet.jsx';
import Screen from '../components/Screen.jsx';
import NewTweet from '../components/NewTweet.jsx';
import { StyleSheet, Text, View } from 'react-native';

export default function TweetScreen() {
  return (
    <Screen>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Home </Text>
      </View>
      <NewTweet></NewTweet>
      <Tweet></Tweet>
    </Screen>
  );
}
const styles = StyleSheet.create({
  titleContainer:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1DA1F2'
  }
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import Tweet from '../components/Tweet.jsx';
import Screen from '../components/Screen.jsx';
import NewTweet from '../components/NewTweet.jsx';
import Separator from '../components/Separator.jsx';
import firebase from '../database/firebase.js';

export default function TweetScreen() {
// declaration of react states
  const [currentUid, setCurrentUid] = useState('');
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [tweets, setTweets] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // use effect to run whenever the tweet screen loads to display the user's tweet.
  useEffect(() => {

    const getTweetData = async () => {
      // retrieval of Uid from localStorage
      const currentUidRetrieval = await AsyncStorage.getItem('currentUid');
      // setting the state of the currentUid from localStorage
      setCurrentUid(currentUidRetrieval);
      // request to firebase to retrieve the user Information
      const userRef = firebase.firestore().collection('users').doc(currentUidRetrieval);
      const userHandleRetrieval = await userRef.get();
      // if the user exists, we will take the handle and the display name and set it to the respective states
      if(userHandleRetrieval.exists){
        setName(userHandleRetrieval.data().name);
        setHandle(userHandleRetrieval.data().handle);
      }
      // firebase request to return the collection of tweets by the user
      firebase.firestore().collection('tweetsBy').doc(currentUidRetrieval).collection('tweets').onSnapshot(docSnapshot => {
        const tweetsArray = [];
        docSnapshot.forEach((doc) => {
          tweetsArray.push(doc.data());
        });
        // function to sort the tweetsArray and return it by most recent
        function DateComparator(dateAPair, dateBPair) {

          var DateA = new Date(dateAPair.createdAt.toDate());
          var DateB = new Date(dateBPair.createdAt.toDate());
          if (DateA > DateB) {
            return -1;
          } else if (DateA < DateB) {
            return 1;
          } else {
            return 0;
          }
        }
        tweetsArray.sort(DateComparator);
        setTweets(tweetsArray);
        setIsLoading(false);
      });
    };
    getTweetData();
    
  }, []);

  // loading spinner when request is made to firebase, so users will get feedback when they enter the Homepage
  if(isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    );
  } 
  return (
    <Screen>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Home </Text>
      </View>
      <NewTweet />
      <View style={styles.tweetContainer}>
        <FlatList
          data={tweets}
          keyExtractor={(tweet) => tweet.createdAt.seconds.toString()}
          renderItem={(item)=>{
            return(
              <>
                <Tweet
                  message={item.item.message}
                  name={name}
                  handle={handle}
                  time={moment(item.item.createdAt.toDate()).format('LLL')}
                >
                </Tweet>
                <Separator></Separator>
              </>
            );
          }}
        >
        </FlatList>
      </View>
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
  },
  tweetContainer: {
  }
});

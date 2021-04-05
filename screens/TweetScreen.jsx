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

  useEffect(() => {
    const getTweetData = async () => {
      const currentUidRetrieval = await AsyncStorage.getItem('currentUid');
      setCurrentUid(currentUidRetrieval);
      const userRef = firebase.firestore().collection('users').doc(currentUidRetrieval);
      const userHandleRetrieval = await userRef.get();
      if(userHandleRetrieval.exists){
        console.log(userHandleRetrieval.data().handle);
        setName(userHandleRetrieval.data().name);
        setHandle(userHandleRetrieval.data().handle);
      }
      firebase.firestore().collection('tweetsBy').doc(currentUidRetrieval).collection('tweets').onSnapshot(docSnapshot => {
        const tweetsArray = [];
        docSnapshot.forEach((doc) => {
          tweetsArray.push(doc.data());
          // console.log(doc.id, doc.data());
          // console.log(doc.data().createdAt.toDate());
        });
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
        console.log(tweets);
      });
    };
    getTweetData();
    
  }, []);

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

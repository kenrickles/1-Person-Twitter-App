import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Screen from './Screen.jsx';

export default function Tweet({ message, name, handle, time}) {

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.info}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{name}
                <Text style={styles.userHandleAndTime}>@{handle} ·  {time}</Text>
              </Text>
              <Text style={styles.tweetText}>{message}</Text>
              <View style={styles.tweetTextContainer}>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 15,
    justifyContent: 'flex-start',
    alignItems:'flex-start'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
    maxHeight: 200,
    maxWidth: 'auto',
    paddingBottom: 10,
  },
  userName: 
  { color: 'black', 
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  userHandleAndTime: {
    color: 'rgb(136, 153, 166)',
    marginLeft: 5,
    marginRight: 20,
  },
  tweetTextContainer: { 
    flex: 1, 
    borderColor: 
    'blue', 
    borderWidth: 0 
  },
  tweetText: { 
    color: 'black', 
    paddingRight: 30,
    marginLeft: 20,
    marginTop: 10,
  },
});


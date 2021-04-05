import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity, 
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Screen from './Screen.jsx';

export default function Tweet( ) {
  // const navigation = useNavigation();
  const tweet = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas';
  const name = 'John Green';
  const handle = '@johngreen';
  const time = '10:45pm';
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.info}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{name}
                <Text style={styles.userHandleAndTime}>{handle} · {time}</Text>
              </Text>
              <View style={styles.tweetTextContainer}>
                <Text style={styles.tweetText}>{tweet}</Text>
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
    flex: 0.3,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    backgroundColor: 'white',
    marginLeft: 15,
    
  },
  innerContainer: {
    flex: 1,
    borderColor: 'green',
    flexDirection: 'row',
    borderWidth: 0,
    height: 'auto',
    maxHeight: 200,
    maxWidth: 'auto',
  },
  info: {
    flex: 0.77,
    borderColor: 'yellow',
    flexDirection: 'column',
    borderWidth: 0
  },
  userDetails: {
    flex: 1,
    borderWidth: 0,
    marginBottom: 5
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


import React from 'react';
import { StyleSheet, View } from 'react-native';


// This component is a resusable component to allow for line seperators to be used repeatedly 
export default function Separator() {
  return (
    <View style={styles.separator} />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
  },
});

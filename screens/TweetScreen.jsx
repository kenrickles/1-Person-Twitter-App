import React from 'react';

import Tweet from '../components/Tweet.jsx';
import Screen from '../components/Screen.jsx';
import NewTweet from '../components/NewTweet.jsx';

export default function TweetScreen() {
  return (
    <Screen>
      <NewTweet></NewTweet>
      <Tweet></Tweet>
    </Screen>
  );
}

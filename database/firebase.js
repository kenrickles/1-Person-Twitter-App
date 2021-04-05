import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDiKaCjnGRe2HHaw6YImVevNuK1Qjxg-DA',
  authDomain: 'person-twitterapp.firebaseapp.com',
  projectId: 'person-twitterapp',
  storageBucket: 'person-twitterapp.appspot.com',
  messagingSenderId: '1018204699435',
  appId: '1:1018204699435:web:fecb427874f469e162236e'
};
firebase.initializeApp(firebaseConfig);

export default firebase;
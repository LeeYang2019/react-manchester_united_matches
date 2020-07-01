import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBiM8Dv_DGURmiyN_gBKGhk8a1Asg8HTAs',
  authDomain: 'my-team-a3378.firebaseapp.com',
  databaseURL: 'https://my-team-a3378.firebaseio.com',
  projectId: 'my-team-a3378',
  storageBucket: 'my-team-a3378.appspot.com',
  messagingSenderId: '288667741664',
  appId: '1:288667741664:web:1a203505c6a14cc3e54f85',
  measurementId: 'G-6GXSDNJKKL',
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export { firebase, firebaseMatches };

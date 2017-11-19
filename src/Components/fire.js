import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgU1VCRk9ld9-Xhs7cfhSnbEJJWiRSHTA",
    authDomain: "decodemtl-nsu.firebaseapp.com",
    databaseURL: "https://decodemtl-nsu.firebaseio.com",
    projectId: "decodemtl-nsu",
    storageBucket: "decodemtl-nsu.appspot.com",
    messagingSenderId: "671775643746"
  };
  
  firebase.initializeApp(config);

  export default firebase;
var firebaseConfig = {
    apiKey: "AIzaSyBO9iJnCQgAbn-Jn-lgh8YHtBRXU420UjQ",
    authDomain: "asia-cafe-b97aa.firebaseapp.com",
    projectId: "asia-cafe-b97aa",
    storageBucket: "asia-cafe-b97aa.appspot.com",
    messagingSenderId: "579229166694",
    appId: "1:579229166694:web:42f097a1f0c88fc07911a7",
    measurementId: "G-X53LGMJBTM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();
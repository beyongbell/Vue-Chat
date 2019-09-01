import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyC9npvE671EH1LvDNJYCManWruRAZPHIP4",
  authDomain: "vue-js-edb1c.firebaseapp.com",
  databaseURL: "https://vue-js-edb1c.firebaseio.com",
  projectId: "vue-js-edb1c",
  storageBucket: "",
  messagingSenderId: "448887289795",
  ppId: "1:448887289795:web:e204a8e9898c3f0d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
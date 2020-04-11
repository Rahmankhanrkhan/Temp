import * as firebase from 'firebase';
// import 'firebase/firestore'
// import 'firebase/auth'


var config = {
  apiKey: "AIzaSyBqChZRsyIQ16yq503RV2WEuhnLkssL4sk",
  authDomain: "crud-e816f.firebaseapp.com",
  databaseURL: "https://crud-e816f.firebaseio.com",
  projectId: "crud-e816f",
  storageBucket: "crud-e816f.appspot.com",
  messagingSenderId: "9473715802",
  appId: "1:9473715802:web:de80045d93b67b09c2b263"
}

const fireaBaseConfig = firebase.initializeApp(config).database().ref('data');

export default fireaBaseConfig

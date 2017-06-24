import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBhKmNthC0D54AWeNN_ZqnNwx4oQCqx6FI',
  authDomain: 'food-log-fe124.firebaseapp.com',
  databaseURL: 'https://food-log-fe124.firebaseio.com',
  projectId: 'food-log-fe124',
  storageBucket: 'food-log-fe124.appspot.com',
  messagingSenderId: '173394592537'
}
firebase.initializeApp(config)

export default firebase

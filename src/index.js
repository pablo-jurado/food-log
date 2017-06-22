import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import firebase from './firebase.js'

let appState = {
  isLogin: false,
  currentItem: '',
  name: '',
  email: '',
  password: '',
  items: []
}

// this is the reference to the my DB item
const itemsRef = firebase.database().ref('items')
// this watch for changes in the the value and updates appState when DB changes
itemsRef.on('value', (snapshot) => {
  let items = snapshot.val()
  let newState = []
  for (let item in items) {
    newState.push({
      id: item,
      title: items[item].title,
      user: items[item].user
    })
  }
  appState.items = newState
})

// checks if user is already sign in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // var displayName = user.displayName;
    // var photoURL = user.photoURL;
    // var uid = user.uid;

    // User is signed in, updates user info to appState
    appState.isLogin = true
    appState.email = user.email
  } else {
    console.log('user sign out')
  }
})

function updateProfile () {
  let user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(function() {
    console.log('Update successful.')
  }, function(error) {
    console.log('An error happened.')
  });
}


// ---------------------------------------------------------
// Render Loop
// ---------------------------------------------------------

const rootEl = document.getElementById('root')

function renderNow () {
  ReactDOM.render(App(appState), rootEl)
  window.requestAnimationFrame(renderNow)
}

window.requestAnimationFrame(renderNow)

export default appState

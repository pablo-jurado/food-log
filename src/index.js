import ReactDOM from 'react-dom'
import App from './App'
import firebase from './firebase.js'

let appState = {
  isLogin: false,
  editProfile: false,
  profileImg: null,
  currentItem: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  imgProfile: null,
  items: []
}

// get default profile Img from storage
firebase.storage().ref('images/octo.jpg')
  .getDownloadURL()
  .then(function (url) {
    appState.profileImg = url
  })

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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // var displayName = user.displayName;
    // var photoURL = user.photoURL;
    // var uid = user.uid;

    // User is signed in, updates user info to appState
    appState.isLogin = true
    appState.email = user.email
    if (user.displayName) appState.name = user.displayName
  }
})

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

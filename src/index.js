import ReactDOM from 'react-dom'
import firebase from './firebase.js'
import App from './App'
import appState from './State'

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
    // var displayName = ;
    // User is signed in, updates user info to appState
    appState.isLogin = true
    appState.email = user.email
    appState.userId = user.uid
    // needs to check if they have name and img register
    if (user.displayName) appState.name = user.displayName
    if (user.photoURL) {
      appState.profileImg = user.photoURL
      appState.editProfile.imgUrl = user.photoURL
    }
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

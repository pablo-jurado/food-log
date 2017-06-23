import React from 'react'
import './App.css'
import Main from './Main.js'
import Login from './Login.js'
import Register from './Register.js'
import firebase from './firebase.js'
import appState from './index.js'

function signOutUser () {
  firebase.auth().signOut().then(function() {
    appState.isLogin = false
    appState.showRegister = false
    appState.name = ''
    appState.email = ''
    appState.password = ''
  }, function(error) {
    console.error('Sign Out Error', error)
  })
}

function App (state) {
  let page = null
  let profileClass = 'profile hide'

  if (!state.isLogin) page = Login(state)
  if (state.showRegister) page = Register(state)

  // if user is login show main page and profile
  if (state.isLogin) {
    page = Main(state)
    profileClass = 'profile'
  }
  return (
    <div className='app'>
      <header>
        <div className='wrapper'>
          <h1>Food Log</h1>
          <div className={profileClass}>
            <span>{state.name}</span>
            <button onClick={signOutUser} >Log out</button>
          </div>
        </div>
      </header>
      {page}
    </div>
  )
}

export default App

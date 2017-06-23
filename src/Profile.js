import React from 'react'
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

function Profile (state) {
  let profileClass = 'profile hide'
  // if user is login show main page and profile
  if (state.isLogin) profileClass = 'profile'
  return (
    <div className={profileClass}>
      <span>{state.name}</span>
      <button onClick={signOutUser} >Log out</button>
    </div>
  )
}

export default Profile

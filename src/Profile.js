import React from 'react'
import firebase from './firebase.js'
import appState from './State'

let showDropdown = false

function signOutUser () {
  firebase.auth().signOut().then(function () {
    appState.isLogin = false
    appState.showRegister = false
    appState.name = ''
    appState.email = ''
    appState.password = ''
  }, function (error) {
    console.error('Sign Out Error', error)
  })
}

function editProfile () {
  appState.editProfile.active = true
}

function toggleDropdown () {
  showDropdown = !showDropdown
}

function Profile (state) {
  let profileClass = 'profile hide'
  let dropdownClass = 'profile-dropdown'
  // if user is login show main page and profile
  if (state.isLogin) profileClass = 'profile'
  if (showDropdown) dropdownClass += ' show'
  return (
    <div className={profileClass}>
      <div className='user-button' onClick={toggleDropdown}>{state.name}</div>
      <img src={appState.profileImg} />
      <div className={dropdownClass}>
        <a onClick={editProfile}>Edit Profile</a>
        <a onClick={signOutUser}>Logout</a>
      </div>
    </div>
  )
}

export default Profile

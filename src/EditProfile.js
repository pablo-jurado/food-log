import React from 'react'
import firebase from './firebase.js'
import appState from './index.js'
import Uploader from './Uploader.js'

function updateProfile (name) {
  console.log('update Profile')
  // let user = firebase.auth().currentUser
  // user.updateProfile({
  //   displayName: name
  //   // photoURL: "https://example.com/jane-q-user/profile.jpg"
  // }).catch(function () {
  //   console.log('An error happened updating name.')
  // })
}

function closeModal (e) {
  e.preventDefault()
  appState.editProfile = false
}

function handleInput (e) {
  appState[e.target.name] = e.target.value
}

function editProfile (state) {
  if (state.editProfile) {
    return (
      <div>
        <div className='modal'>
          <form className='edit-profile-form'>
            <h4>Edit Profile</h4>
            <img src={appState.profileImg} alt='profile' />
            {Uploader()}
            <input placeholder='Name' onChange={handleInput} value={state.name} name='name' type='text' />
            <input placeholder='Email' onChange={handleInput} value={state.email} name='email' type='text' />
            <input placeholder='Password' onChange={handleInput} value={state.password} name='password' type='password' />
            <input placeholder='Confirm Password' onChange={handleInput} value={state.confirmPassword} name='confirmPassword' type='password' />
            <div className='action-row'>
              <button onClick={updateProfile} className='primary-btn' id='loginBtn'>Save</button>
              <button onClick={closeModal} className='primary-btn' id='loginBtn'>Cancel</button>
            </div>
          </form>
        </div>
        <div className='modal-back' onClick={closeModal} />
      </div>
    )
  }
}

export default editProfile

import React from 'react'
import appState from './State'
import firebase from './firebase.js'

function register (evt) {
  evt.preventDefault()
  // TODO: validate email and pass
  if (appState.password !== appState.confirmPassword) {
    console.log('password not matching')
    return
  }

  let email = appState.email
  let password = appState.password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      appState.isLogin = true
      updateProfile(appState.name)
    })
    .catch(function (error) {
      if (error.code === 'auth/weak-password') {
        console.log('The password is too weak.')
      } else {
        console.log(error.message)
      }
    })
}

function updateProfile (name) {
  // get default profile Img from storage
  firebase.storage().ref('images/default_user.png')
    .getDownloadURL()
    .then(function (url) {
      let user = firebase.auth().currentUser
      // saves default picture on DB
      user.updateProfile({
        displayName: name,
        photoURL: url
      })
      // assings img to user in appState
      appState.profileImg = url
      appState.editProfile.imgUrl = url
    })
}

function handleInput (e) {
  appState[e.target.name] = e.target.value
}

function Register (state) {
  let feedback = ''
  if (state.error === 400) feedback = 'Wrong Username or Password'
  if (state.error === 500) feedback = 'Sorry we are having some difficulties'
  return (
    <form className='login-form'>
      <h1>Register</h1>
      <input placeholder='Name' onChange={handleInput} value={state.name} name='name' type='text' />
      <input placeholder='Email' onChange={handleInput} value={state.email} name='email' type='text' />
      <input placeholder='Password' onChange={handleInput} value={state.password} name='password' type='password' />
      <input placeholder='Confirm Password' onChange={handleInput} value={state.confirmPassword} name='confirmPassword' type='password' />
      <div className='feedback'>{feedback}</div>
      <div className='action-row'>
        <button onClick={register} className='primary-btn' id='loginBtn'>Register</button>
      </div>
    </form>
  )
}

export default Register

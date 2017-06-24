import React from 'react'
import appState from './index.js'
import firebase from './firebase.js'

function login (email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
      // login success
      appState.isLogin = true
    })
    .catch(function (error) {
      // TODO: handle errors feedback
      if (error.code === 'auth/wrong-password') {
        console.log('Wrong password.')
      } else {
        console.log(error.message)
      }
      console.log(error)
    })
}

function handleInput (e) {
  appState[e.target.name] = e.target.value
}

function handleSubmit (evt) {
  evt.preventDefault()
  if (appState.email === '' || appState.password === '') return
  login(appState.email, appState.password)
}

function showRegister () {
  appState.showRegister = true
}

function Login (state) {
  let feedback = ''
  if (state.error === 400) feedback = 'Wrong Username or Password'
  if (state.error === 500) feedback = 'Sorry we are having some difficulties'
  return (
    <form className='login-form'>
      <h1>Login</h1>
      <input placeholder='Email' onChange={handleInput} value={state.email} name='email' type='text' />
      <input placeholder='Password' onChange={handleInput} value={state.password} name='password' type='password' />
      <div className='feedback'>{feedback}</div>
      <button onClick={handleSubmit} className='primary-btn' id='loginBtn'>Log In</button>
      <a onClick={showRegister}>Create new account</a>
    </form>
  )
}

export default Login

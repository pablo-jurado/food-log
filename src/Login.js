import React from 'react'
import appState from './index.js'
import firebase from './firebase.js'

function register (evt) {
  evt.preventDefault()
  // TODO: validate email and pass
  let email = appState.email
  let password = appState.password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      console.log('reugister success!')
      appState.isLogin = true
    })
    .catch(function (error) {
      if (error.code === 'auth/weak-password') {
        console.log('The password is too weak.')
      } else {
        console.log(error.message)
      }
    })
}

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
  console.log(appState)
}

function handleSubmit (evt) {
  evt.preventDefault()
  if (appState.email === '' || appState.password === '') return
  login(appState.email, appState.password)
}

function Login (state) {
  let feedback = ''
  if (state.error === 400) feedback = 'Wrong Username or Password'
  if (state.error === 500) feedback = 'Sorry we are having some difficulties'
  return (
    <form className='login-form'>
      <h1>Login</h1>
      <div className='input-row'>
        <label htmlFor='loginInput'>Username:</label>
        <input onChange={handleInput} value={state.email} name='email' className='big-input' type='text' id='loginInput' />
      </div>
      <div className='input-row'>
        <label htmlFor='passwordInput'>Password:</label>
        <input onChange={handleInput} value={state.password} name='password' className='big-input' type='password' id='passwordInput' />
      </div>
      <div className='feedback'>{feedback}</div>
      <div className='action-row'>
        <button onClick={handleSubmit} className='primary-btn' id='loginBtn'>Log In</button>
        <button onClick={register} className='secondary-btn' id='loginBtn'>Register</button>
      </div>
    </form>
  )
}

export default Login

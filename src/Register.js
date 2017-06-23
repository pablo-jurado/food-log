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
        <input placeholder='Name' onChange={handleInput} value={state.email} name='name' type='text'/>
        <input placeholder='Email' onChange={handleInput} value={state.email} name='email' type='text'/>
        <input placeholder='Password' onChange={handleInput} value={state.password} name='password' type='password' />
        <input placeholder='Confirm Password' onChange={handleInput} value={state.password} name='confirmPassword' type='password' />
      <div className='feedback'>{feedback}</div>
      <div className='action-row'>
        <button onClick={register} className='primary-btn' id='loginBtn'>Register</button>
      </div>
    </form>
  )
}

export default Register

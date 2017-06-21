import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'
import appState from './index.js'

function handleInput (e) {
  appState[e.target.name] = e.target.value
  console.log(appState)
}

function handleSubmit (evt) {
  evt.preventDefault()
  if (appState.username === '' || appState.password === '') return
  // TODO: login with firebase

  console.log('TODO: login with firebase')
  appState.login = true
}

function Login (state) {
  if (state.login) return
  let feedback = ''
  if (state.error === 400) feedback = 'Wrong Username or Password'
  if (state.error === 500) feedback = 'Sorry we are having some difficulties'
  return (
    <form className='login-form' onSubmit={handleSubmit} >
      <h1>Login</h1>
      <div className='input-row'>
        <label htmlFor='loginInput'>Username:</label>
        <input onChange={handleInput} value={state.username} name="username" className='big-input' type='text' id='loginInput' />
      </div>
      <div className='input-row'>
        <label htmlFor='passwordInput'>Password:</label>
        <input onChange={handleInput} value={state.password} name="password" className='big-input' type='password' id='passwordInput' />
      </div>
      <div className='feedback'>{feedback}</div>
      <div className='action-row'>
        <button className='primary-btn' id='loginBtn'>Log In</button>
      </div>
    </form>
  )
}

export default Login

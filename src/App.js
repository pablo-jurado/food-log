import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'
import appState from './index.js'
import Main from './Main.js'
import Login from './Login.js'


function App (state) {
  return (
    <div className='app'>
      <header>
          <div className='wrapper'>
            <h1>Food Log</h1>
          </div>
      </header>
      {Login(state)}
      {Main(state)}
    </div>
  )
}

export default App

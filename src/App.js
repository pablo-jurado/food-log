import React from 'react'
import './App.css'
import Main from './Main.js'
import Login from './Login.js'
import Profile from './Profile.js'
import Register from './Register.js'

function App (state) {
  let page = null
  if (!state.isLogin) page = Login(state)
  if (state.showRegister) page = Register(state)
  if (state.isLogin) page = Main(state)
  return (
    <div className='app'>
      <header>
        <div className='wrapper'>
          <h1>Food Log</h1>
          {Profile(state)}
        </div>
      </header>
      {page}
    </div>
  )
}

export default App

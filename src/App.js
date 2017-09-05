import React from 'react'
import './App.css'
import Main from './Main.js'
import Login from './Login.js'
import Profile from './Profile.js'
import EditProfile from './EditProfile.js'
import Register from './Register.js'

function App (state) {
  let page = null
  if (!state.isLogin) page = Login(state)
  if (state.showRegister) page = Register(state)
  if (state.isLogin) page = Main(state)
  return (
    <div>
      <div className='app'>
        <header>
          <h1>Food Log</h1>
          {Profile(state)}
        </header>
        {page}
      </div>
      {EditProfile(state)}
      <footer>
        <a href="http://pablojurado.com" target="_blank" rel="noopener noreferrer">Pablo Jurado</a>
      </footer>
    </div>
  )
}

export default App

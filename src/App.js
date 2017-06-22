import React from 'react'
import './App.css'
import Main from './Main.js'
import Login from './Login.js'

function App (state) {
  let page = Login(state)
  if (state.isLogin) page = Main(state)
  return (
    <div className='app'>
      <header>
        <div className='wrapper'>
          <h1>Food Log</h1>
        </div>
      </header>
      {page}
    </div>
  )
}

export default App

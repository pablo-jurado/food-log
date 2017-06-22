import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import firebase from './firebase.js'

let appState = {
  isLogin: null,
  currentItem: '',
  name: '',
  email: '',
  password: '',
  items: []
}

function updateDB () {
  const itemsRef = firebase.database().ref('items')
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val()
    let newState = []
    for (let item in items) {
      newState.push({
        id: item,
        title: items[item].title,
        user: items[item].user
      })
    }
    appState.items = newState
  })
}

// ---------------------------------------------------------
// Render Loop
// ---------------------------------------------------------

const rootEl = document.getElementById('root')

function renderNow () {
  updateDB()
  ReactDOM.render(App(appState), rootEl)
  window.requestAnimationFrame(renderNow)
}

window.requestAnimationFrame(renderNow)

export default appState

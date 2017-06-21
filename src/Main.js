import React, { Component } from 'react';
import firebase from './firebase.js'
import appState from './index.js'

function removeItem(itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`);
  itemRef.remove()
}

function handleChange(e) {
  appState[e.target.name] = e.target.value
}

function handleSubmit(e) {
  e.preventDefault()
  if (appState.currentItem === '' || appState.username === '') return
  const itemsRef = firebase.database().ref('items')
  const item = {
    title: appState.currentItem,
    user: appState.username
  }
  itemsRef.push(item)

  appState.currentItem = ''
  appState.username = ''
}

function Main (state) {
  if (!state.login) return
  return (
    <div className='container'>
      <section className='add-item'>
          <form onSubmit={handleSubmit} >
            <input type="text" name="username" placeholder="What's your name?" onChange={handleChange} value={state.username} />
            <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={handleChange} value={state.currentItem} />
            <button>Add Item</button>
          </form>
      </section>
      <section className='display-item'>
        <div className='wrapper'>
          <ul>
            {state.items.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.title}</h3>
                  <p>brought by: {item.user}</p>
                  <button onClick={() => removeItem(item.id)}>Remove Item</button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Main

import React from 'react'
import firebase from './firebase.js'
import appState from './index.js'

function removeItem (itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`)
  itemRef.remove()
}

function handleChange (e) {
  appState[e.target.name] = e.target.value
}

function handleSubmit (e) {
  e.preventDefault()
  if (appState.currentItem === '') return
  const itemsRef = firebase.database().ref('items')
  const item = {
    title: appState.currentItem,
    user: appState.name
  }
  itemsRef.push(item)
  appState.currentItem = ''
}

function Main (state) {
  return (
    <div className='container'>
      <section className='add-item'>
        <form onSubmit={handleSubmit} >
          <div>Hi there {state.name}!</div>
          <input type='text' name='currentItem' placeholder='What are you bringing?' onChange={handleChange} value={state.currentItem} />
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

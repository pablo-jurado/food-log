import React from 'react'
import firebase from './firebase.js'
import appState from './index.js'

function editProfile (state) {
  if (state.editProfile) {
    return (
      <div>
        this will be an awesome modal some day!
      </div>
    )
  }
}

export default editProfile

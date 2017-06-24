/* global FileReader */
import React from 'react'
import appState from './index.js'
import firebase from './firebase.js'

// storage :  allow read, write: if request.auth != null;

function previewFile (e) {
  var file = e.target.files[0]
  var reader = new FileReader()
  console.log('file', file)

  firebase.storage().ref().child('images/' + file.name).put(file)
    .then(function (snapshot) {
      console.log('Uploaded file!')
    })
}

function Uploader (state) {
  return (
    <div className='uploader'>
      <input onChange={previewFile} type='file' />
    </div>
  )
}

export default Uploader

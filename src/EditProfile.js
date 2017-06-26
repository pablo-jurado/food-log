import React from 'react'
import firebase from './firebase.js'
import appState from './State'

function SaveChanges (e) {
  e.preventDefault()
  if (appState.editProfile.name !== '') appState.name = appState.editProfile.name
  saveImg()
}

function getImgFromStorage () {
  firebase.storage().ref('images/' + appState.userId)
    .getDownloadURL()
    .then(function (url) {
      let user = firebase.auth().currentUser
      // saves storage picture URL on firebase user profile
      user.updateProfile({
        displayName: appState.name,
        photoURL: url
      })
      // assings img to user in appState
      console.log('got pic from storage')
      appState.profileImg = url
      appState.editProfile.imgUrl = url
      appState.editProfile.active = false
    }).catch(function () {
      console.log('An error happened updating name.')
    })
}

function saveImg () {
  let file = appState.editProfile.imgFile
  if (file) {
    firebase.storage().ref().child('images/' + appState.userId)
      .put(file)
      .then(function (snapshot) {
        console.log('Uploaded file!')
        getImgFromStorage()
      })
  }
}

function closeModal (e) {
  e.preventDefault()
  appState.editProfile.name = ''
  appState.editProfile.imgFile = null
  appState.editProfile.imgUrl = appState.profileImg
  appState.editProfile.active = false
}

function handleInput (e) {
  appState['editProfile'][e.target.name] = e.target.value
}

function loadFile (e) {
  let file = e.target.files[0]
  renderImage(file)
}

function renderImage (file) {
  // generate a new FileReader object
  var reader = new FileReader()
  // saves url and file to appState
  reader.onload = function (event) {
    let theUrl = event.target.result
    appState.editProfile.imgUrl = theUrl
    appState.editProfile.imgFile = file
    console.log('img load on local state')
  }
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(file)
}

function editProfile (state) {
  if (state.editProfile.active) {
    return (
      <div>
        <div className='modal'>
          <form className='edit-profile-form'>
            <h4>Edit Profile</h4>
            <img src={appState.editProfile.imgUrl} alt='profile' />
            <div className='uploader'>
              <input onChange={loadFile} type='file' />
            </div>
            <input placeholder={state.name} onChange={handleInput} value={state.editProfile.name} name='name' type='text' />
            <div className='action-row'>
              <button onClick={SaveChanges} className='primary-btn' id='loginBtn'>Save</button>
              <button onClick={closeModal} className='primary-btn' id='loginBtn'>Cancel</button>
            </div>
          </form>
        </div>
        <div className='modal-back' onClick={closeModal} />
      </div>
    )
  }
}

export default editProfile

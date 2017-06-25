
let appState = {
  isLogin: false,
  editProfile: {
    active: false,
    name: '',
    email: '',
    imgUrl: null,
    imgFile: null
  },
  profileImg: null,
  userId: null,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  imgProfile: null,
  currentItem: '',
  items: []
}

export default appState

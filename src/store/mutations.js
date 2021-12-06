
export default {
  setMyInfo(state, payload) {
    state.myInfo = window.sessionStorage.getItem('myInfo') ? JSON.parse(window.sessionStorage.getItem('myInfo')) : ''

  }
}
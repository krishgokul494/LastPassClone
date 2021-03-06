import Api from '@/services/Api'
export default {
  register (credentials) {
    return Api().post('register', credentials)
  },

  login (credentials) {
    return Api().post('login', credentials)
  },

  logout () {
    return Api().post('logout')
  },

  isLogged () {
    return Api().post('isAuthenticated')
  }
}

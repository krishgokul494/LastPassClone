import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Vault from '@/components/Vault'
import AuthenticationServices from '@/services/AuthenticationService'

import store from '@/store/store'
Vue.use(Router)

var router = new Router({
  linkActiveClass: 'router-link-active-class',
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/vault',
      name: 'Vault',
      component: Vault
    }
  ]
})

var noAuth = ['Login', 'Register']

router.beforeEach(async (to, from, next) => {
  var authenticated = await AuthenticationServices.isLogged()
  if (!noAuth.includes(to.name)) {
    if (!authenticated.data) {
      router.push('Login')
    } else {
      store.state.logged = true
      next()
    }
  } else {
    if (authenticated.data) {
      router.push('Vault')
    } else {
      next()
    }
  }
})

export default router

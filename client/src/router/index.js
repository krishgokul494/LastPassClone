import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Vault from '@/components/Vault'
import AuthenticationServices from '@/services/AuthenticationService'
Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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

var noAuth = ['Login', 'Register', 'HelloWorld']

router.beforeEach(async (to, from, next) => {
  console.log(from)
  if(!noAuth.includes(to.name)){
    var authenticated = await AuthenticationServices.isLogged()
    if(!authenticated.data){
      window.location.replace('/#/login')
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Splash from './views/Splash.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/patient',
      name: 'patient',
      component: Home
    },
    {
      path: '/provider',
      name: 'provider',
      component: Home
    },
    {
      path: '/payer',
      name: 'payer',
      component: Home
    },
    {
      path: '/paid',
      name: 'paid',
      component: Home
    }  
  ]
})

import Vue from 'vue'
import App from './App.vue'

// import http from "./http";
// Vue.prototype.$http = http; 


import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Login from './components/Login'

import Employees from './components/Employees/Employees'
import AddEmployee from './components/Employees/AddEmployee'

import Tasks from './components/Tasks/Tasks'
import AddTask from './components/Tasks/AddTask'
import Asset from './components/Tasks/Asset'
import Requirments from './components/Tasks/Requirments'

import Requests from './components/Requests/Requests'

import VueCookies from 'vue-cookies'


Vue.use(VueCookies)
Vue.use(vueResource)
Vue.use(VueRouter)

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Login},
    {path: '/tasks', component: Tasks},
    {path: '/requests', component: Requests},
    {path: '/employees', component: Employees},
    {path: '/addEmployee', component: AddEmployee},
    {path: '/addTask', component: AddTask},
    {path: '/asset', component: Asset},
    {path: '/requirment', component: Requirments},
  ]
})

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

new Vue({
  router,
  template: 
  `<div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')


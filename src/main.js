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
import Edit from './components/Tasks/Edit'
import Asset from './components/Tasks/Asset'
import Requirments from './components/Tasks/Requirments'
import TaskDetails from './components/Tasks/TaskDetails'

import Requests from './components/Requests/Requests'
import EmpRequests from './components/Requests/EmpRequests'
import EmpTasks from './components/Requests/EmpTasks'

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
    {path: '/requests',  name: 'requests',props: true ,component: Requests},
    {path: '/employee/requests',  name: 'employee/requests',props: true ,component: EmpRequests},
    {path: '/employee/tasks',  name: 'employee/tasks',props: true ,component: EmpTasks},
    {path: '/employees', component: Employees},
    {path: '/addEmployee', component: AddEmployee},
    {path: '/addTask', component: AddTask},
    {path: '/edit/task/:id', component: Edit},
    {path: '/asset/task/:id', component: Asset},
    {path: '/requirment/task/:id', component: Requirments},
    {path: '/view/task/:id', component: TaskDetails},
  ]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

// new Vue({
//   router,
//   template: 
//   `<div id="app">
//       <router-view></router-view>
//     </div>
//   `
// }).$mount('#app')


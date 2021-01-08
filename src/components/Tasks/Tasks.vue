<template>
<div class="row">
    <Nav />
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Tasks</h1>
    <br />
    <div class="mb-30">
            <td><router-link
            v-if="user.user.type == 'admin'"
             class="btn btn-success mb-30" v-bind:to="'/addTask'">Add Task</router-link></td>
    </div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>description</th>
            <th>deadline</th>
            <th>budget</th>
            <th>status</th>
            <th>Action</th>
            <th v-if="user.user.type == 'admin'">Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task , index) in tasks" :key=index>
            <td>{{task.id}} </td>
            <td>{{task.title}}</td>
            <td>{{task.description}}</td>
            <td>{{task.deadline}}</td>
            <td>{{task.budget}}</td>
            <td>{{task.status}}</td>

            <td v-if="user.user.type == 'admin'">
              <router-link class="btn btn-default" v-bind:to="'/asset/'">
              Add asset
              </router-link>
              </td>

              <td v-if="user.user.type == 'admin'">
              <router-link class="btn btn-default" v-bind:to="'/requirment/'">
              Add requirment
              </router-link>
              </td>

            <td v-on:click="assignTaske(task.id)" v-if="user.user.type == 'employee'">
              <router-link 
               class="btn btn-default" v-bind:to="'/tasks/'">
              Take it
              </router-link>
              </td>
          </tr>
           
        </tbody>
    </table>
  </div>
  </div>
</template>
<script>
    import Alert from '../Alert'
    import Nav from '../Nav'
export default {
  
    name:'tasks',
    data(){
        return{
            tasks:[],
        alert:'',
      user:this.$cookies.get('user').user,
            
        }
    },
    methods:{
        fetchTasks(){
          this.$http.get('https://bounty-board.herokuapp.com/api/tasks?filter=[["status","=","available"]]',
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              // console.log(response.body.items)
                this.tasks = (response.body.items)
                 })
            .catch(function (error) {
                 console.log('ss'+error.body.errors[0].details);
                //  this.alert ( error.body.errors[0].details);
               })
        },
         assignTaske(id){

          let data = {
            employee_id:this.$cookies.get('user').user.id,
            task_id:id
          }
               let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               
        this.$http.post('https://bounty-board.herokuapp.com/api/requestTasks',data, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/tasks'});
                 })
            .catch(function (error) {
                 console.log('err   '+error.body.errors[0].details);
                 this.alert = error.body.errors[0].details;
               })
        },
          
    },
    created:function() {
      console.log( 'dd ' +this.$cookies.get('user').user.type)
            this.fetchTasks()
        
    },
     components: {
        Alert,
        Nav
    }
}
</script>  
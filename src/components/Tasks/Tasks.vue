<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Tasks</h1>
    <!-- <input class="form-control" placeholder="Enter Last Name" v-model="filterInput"> -->
    <br />
    <div class="mb-30">
            <td><router-link class="btn btn-success mb-30" v-bind:to="'/addTask'">Add Task</router-link></td>
    </div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>description</th>
            <th>deadline</th>
            <th>budget</th>
            <th>Add</th>
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
            <td><router-link class="btn btn-default" v-bind:to="'/tasks/'+task.id">Edit</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
    import Alert from '../Alert'
    import Nav from '../Nav'
export default {
  
    name:'tasks',
    data(){
        return{
            tasks:[]
        }
    },
    methods:{
        fetchTasks(){
          this.$http.get('https://bounty-board.herokuapp.com/api/tasks' ,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              console.log(response.body.items)
                this.tasks = (response.body.items)
                 })
            .catch(function (error) {
                 console.log(error);
                 this.alert ( error.body.errors[0].title);
               })
        }
    },
    created:function() {
      console.log(this.$cookies.get('user').user.type)
            this.fetchTasks()
        
    }
}
</script>
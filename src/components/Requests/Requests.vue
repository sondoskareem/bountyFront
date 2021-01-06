<template>
 <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Requests</h1>
    <!-- <input class="form-control" placeholder="Enter Last Name" v-model="filterInput"> -->
    <br />
    <div class="mb-30">
            <td><router-link class="btn btn-success mb-30" v-bind:to="'/addTask'+1">Add New Employee</router-link></td>
    </div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Task title</th>
            <th>Edite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <td>w </td>
            <td>w</td>
            <td>w</td>
            <td>w</td>
            <td>w</td>
            <td><router-link class="btn btn-default" v-bind:to="'/tasks/'+1">View</router-link></td>

          <tr v-for="(task , index) in tasks" :key=index>
            <td>{{task.id}} </td>
            <td>{{task.name}}</td>
            <td>{{task.email}}</td>
            <td>{{task.phone}}</td>
            <td>{{task.Department}}</td>
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
    name: 'add',
    data () {
        return {
        customer: {},
        alert:''
        }
    },
    methods: {
        addCustomer(e){
         let options = {
              method: 'Get',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : 'Bearer '+this.$cookies.get('user').access_token,
                'Access-Control-Allow-Origin': '*'
              },
            }
         
            console.log(options)

            fetch('https://bounty-board.herokuapp.com/api/employees'  ,options )
            .then(function (response){
              // console.log(response.body)
                this.tasks = (response.body)
                 })
            .catch(function (error) {
                 console.log(error);
                 this.alert = error.body.errors[0].title;
               })
            e.preventDefault();
        }
    },
    components: {
        Alert,
        Nav
    }
    }
</script>

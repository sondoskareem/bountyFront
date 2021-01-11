<template>
   <div class="row" v-if="user.user.type = 'employee'" >
    <Nav />
 <div class="customers container">

    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Requests  </h1>
    <br />
   
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Task Number</th>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Task Budget</th>
            <th>Created At</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request , index) in requests" :key=index>
            <td>{{request.task.id}}</td>
            <td>{{request.task.title}}</td>
            <td>{{request.task.description}}</td>
            <td>{{request.task.budget}}</td>
            <td>{{request.created_at}}</td>
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
    name: 'requests',
    data () {
        return {
        requests: [],
        alert:'',
        user:this.$cookies.get('user').user,
        }
    },
    methods: {

         getRequests(){
          //  console.log(Object.keys(this.$route.query)[0])
           console.log('https://bounty-board.herokuapp.com/api/requestTasks/by/empID?'+Object.values(this.$route.query)[0])
          this.$http.get('https://bounty-board.herokuapp.com/api/requestTasks/by/empID?'+Object.values(this.$route.query)[0],
          {headers: {'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,},})
            .then(function (response){this.requests = (response.body)})
            .catch(function (error) {this.alert = error.body.errors[0].details})
        },

    },
     created:function() {
        this.getRequests()
        
    },
    components: {
        Alert,
        Nav
    }
    }
</script>

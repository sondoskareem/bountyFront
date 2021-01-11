<template>
   <div class="row">
    <Nav />
 <div class="customers container">

    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Employees</h1>
    <br />
    <div class="mb-30">
            <td><router-link class="btn btn-success mb-30" v-bind:to="'/addEmployee'">Add New Employee</router-link></td>
    </div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>View</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp , index) in emps" :key=index>
            <td>{{emp.user.id}} </td>
            <td>{{emp.user.name}}</td>
            <td>{{emp.user.phone}}</td>
            <td>{{emp.user.email}}</td>
            <td>{{emp.department}}</td>
            <td><router-link class="btn btn-default" v-bind:to="'/employees'">Edit</router-link></td>
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
    name: 'employees',
    data () {
        return {
        emps: [],
        alert:''
        }
    },
    methods: {
         getEmp(){
           
          this.$http.get('https://bounty-board.herokuapp.com/api/employees' ,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "accept": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              console.log(response.body.items)
                this.emps = (response.body.items)
                 })
            .catch(function (error) {
                 console.log(error.body.errors[0].details);
                 this.alert = error.body.errors[0].details

                 if(error.body.errors[0].title == "Unauthenticated"){
                    this.$router.push({path: '/', query: {alert: 'Unauthenticated Login again'}});
                    }

               })
        }
        
    },
     created:function() {
        if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      console.log(this.$cookies.get('user').user.type)
            this.getEmp()
        
    },
    components: {
        Alert,
        Nav
    }
    }
</script>

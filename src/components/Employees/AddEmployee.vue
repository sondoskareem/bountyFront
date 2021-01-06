<template>
<div class="row">
    <Nav />
 <div class="add container">

    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add Employee</h1>
    <form v-on:submit="addEmp">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Email" v-model="emp.email">
            </div>
            <div class="form-group">
                <label>Body</label>
                <input type="text" class="form-control" placeholder="Phone" v-model="emp.phone">
            </div>

            <div class="form-group">
                <label>Body</label>
                <input type="text" class="form-control" placeholder="Password" v-model="emp.password">
            </div>

            <div class="form-group">
                <label>Body</label>
                <input type="text" class="form-control" placeholder="Name" v-model="emp.name">
            </div>
        </div>  
      
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
 
</template>


<script>
    import Alert from '../Alert'
    import Nav from '../Nav'
    export default {
    name: 'addEmp',
    data () {
        return {
        emp: {},
        alert:''
        }
    },
    methods: {
        addEmp(e){

            //  let emp = {
            //         name: this.task.name,
            //         email: this.task.email,
            //         department: this.task.department,
            //         phone: this.task.phone,
            //         password: this.task.password,
            //     }

            // let options = {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json;charset=utf-8',
            //     'Authorization' : 'Bearer '+this.$cookies.get('user').access_token,
            //     'Access-Control-Allow-Origin': '*'
            //   },
            //   body:emp
            // }
         
            // console.log(options)

            // fetch('https://bounty-board.herokuapp.com/api/tasks'  ,options )
            // .then(function (response){
            //   // console.log(response.body)
            //     this.tasks = (response.body)
            //             this.$router.push({path: '/employees', query: {alert: 'Employee Added'}});

            //      })
            // .catch(function (error) {
            //      console.log(error);
            //      this.alert = error.body.errors[0].title;
            //    })

                e.preventDefault();
            
        }
    },
    components: {
        Alert,
        Nav
    }
    }
</script>

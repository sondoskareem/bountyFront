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
            <div class="form-group">
                <label>name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="emp.name">
            </div>
                <label>email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="emp.email">
            </div>
            <div class="form-group">
                <label>phone</label>
                <input type="number" class="form-control" placeholder="Phone" v-model="emp.phone">
            </div>

            <div class="form-group">
                <label>password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="emp.password">
            </div>

            <div class="form-group">
                <label>department</label>
                <input type="text" class="form-control" placeholder="department" v-model="emp.department">
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

             let emp = {
                    name: this.emp.name,
                    email: this.emp.email,
                    department: this.emp.department,
                    phone: this.emp.phone,
                    password: this.emp.password,
                }
                let  headers= {
                    // "Content-type": "application/json",
                    // "accept": "application/json",
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               
        this.$http.post('https://bounty-board.herokuapp.com/api/employees',emp, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/employees', query: {alert: 'Employee Added'}});
                 })
            .catch(function (error) {
                 console.log('err   '+error.body.errors[0].details);
                 this.alert = error.body.errors[0].details;
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

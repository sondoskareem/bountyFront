
<template>
  <div class="add container  ">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Login</h1>
    <form class="col-md-6 "  v-on:submit="login">
        <div class="well ">
            <div class="form-group">
                <label>Phone number</label>
                <input type="number" class="form-control" placeholder="Phone number" v-model="user.phone" >
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="user.password" >
            </div>
        </div>  
      
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
    import Alert from './Alert'
    export default {
    name: 'login',
    data () {
        return {
        user: {},
        alert:''
        }
    },
    methods: {
        login(e){
             if(!this.user.phone || !this.user.password){
                this.alert = 'Please fill in all required fields';
            } else {
                let loginInfo = {
                    phone: this.user.phone,
                    password: this.user.password,
                }

                this.$http.post('https://bounty-board.herokuapp.com/api/login', loginInfo)
                    .then(function(response){
                     this.$cookies.set('user',response.body);
                     console.log(response.body);
                        this.$router.push({path: '/tasks', query: {alert: 'Login Successfully '}});
                    })
                    .catch(function (error) {
                        console.log(error.body);
                      this.alert = error.body.error;
                      })

                e.preventDefault();
           
        }
        }
    },
    components: {
        Alert
    }
    }
</script>



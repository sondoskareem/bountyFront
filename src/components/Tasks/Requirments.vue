<template>
<div class="row">
    <Nav />
 <div class="add container" v-if="user.user.type == 'admin'">
  <div class="mb-30">
            <router-link class="btn btn-default mb-30" v-bind:to="'/edit/task/'+this.$route.params.id">Back</router-link>
    </div>
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add Task</h1>
    <form v-on:submit="addReq">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
                <label>requirment</label>
                <input type="text" class="form-control" placeholder="requirment" v-model="task.requirment">
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
    name: 'add',
    data () {
        return {
        task: {},
        alert:'',
        user:this.$cookies.get('user').user,

        }
    },
    methods: {
        addReq(e){
           let newRequirment = {
                    requirment: this.task.requirment,
                    task_id:this.$route.params.id
                }

                let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               
        this.$http.post('https://bounty-board.herokuapp.com/api/requirments',newRequirment, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/tasks', query: {alert: 'requirment Added'}});
                //  this.alert ='requirment Added'

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

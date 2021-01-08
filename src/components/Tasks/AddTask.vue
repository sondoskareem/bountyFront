<template>
<div class="row">
    <Nav />
 <div class="add container">
    <div class="mb-30">
            <td><router-link
            v-if="user.user.type == 'admin'"
             class="btn btn-default mb-30" v-bind:to="'/tasks'">Back</router-link></td>
    </div>
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add Task</h1>
    <form v-on:submit="addTask">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Title" v-model="task.title">
            </div>
            <div class="form-group">
                <label>description</label>
                <input type="text" class="form-control" placeholder="description" v-model="task.description">
            </div>
            <div class="form-group">
                <label>department</label>
                <input type="text" class="form-control" placeholder="department" v-model="task.department">
            </div>
            <div class="form-group">
                <label>deadline</label>
                <input type="text" class="form-control" placeholder="deadline" v-model="task.deadline">
            </div>
            <div class="form-group">
                <label>budget</label>
                <input type="text" class="form-control" placeholder="budget" v-model="task.budget">
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
        addTask(e){
                let newTask = {
                    title: this.task.title,
                    description: this.task.description,
                    department: this.task.department,
                    deadline: this.task.deadline,
                    budget: this.task.budget,
                }

                let  headers= {
                    // "Content-type": "application/json",
                    // "accept": "application/json",
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               
        this.$http.post('https://bounty-board.herokuapp.com/api/tasks',newTask, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/tasks', query: {alert: 'Task Added'}});
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

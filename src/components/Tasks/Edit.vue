<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Task</h1>
  <div style="margin-bottom:10px">
            <router-link class="btn btn-default" v-bind:to="'/tasks'">Back</router-link>
            <router-link class="btn btn-default" v-bind:to="'/asset/task/'+task.id">Add Asset</router-link>
            <router-link class="btn btn-default" v-bind:to="'/requirment/task/'+task.id">Add Requirment</router-link>
    </div>
    
    <form v-on:submit="updateTask">
        <div class="well">
            <h4>Task Info</h4>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Title" v-model="task.title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" placeholder="Description" v-model="task.description">
            </div>
        </div>
        <div class="well">
            <h4>Detailed Info</h4>
            <div class="form-group">
                <label>Deadline</label>
                <input type="text" class="form-control" placeholder="Deadline" v-model="task.deadline">
            </div>
            <div class="form-group">
                <label>Budget</label>
                <input type="text" class="form-control" placeholder="Budget" v-model="task.budget">
            </div>
            
        </div>

        <div class="well">
            <h4>Status</h4>
            <div class="form-group">
                <label>Status</label>
                <input type="text" class="form-control" placeholder="Status" v-model="task.status">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

  </div>
</template>

<script>
    import Alert from '../Alert'
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
         fetchTask(id){
          this.$http.get('https://bounty-board.herokuapp.com/api/tasks/'+id,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              // console.log(response.body.items)
                this.task = (response.body)
                // console.log(response.body)

                 })
            .catch(function (error) {
                 console.log('ss'+error.body.errors[0].details);
                 this.alert ( error.body.errors[0].details);
               })
        },
        updateTask(e){
                let newTask = {
                    title: this.task.title,
                    description: this.task.description,
                    department: this.task.department,
                    deadline: this.task.deadline,
                    budget: this.task.budget,
                    status: this.task.status,
                }

                let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               console.log(newTask)
        this.$http.post('https://bounty-board.herokuapp.com/api/tasks/'+this.$route.params.id,newTask, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/tasks', query: {alert: 'Task Updated'}});
                 })
            .catch(function (error) {
                //  console.log(error);
                //  console.log(headers);
                 this.alert = error.body.errors[0].details;
               })
                e.preventDefault();
           
        }
    },
    created: function(){
        this.fetchTask(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

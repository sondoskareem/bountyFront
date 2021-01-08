<template>
   <div class="row" v-if="shouldRender" >
    <Nav />
 <div class="customers container">

    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Requests</h1>
    <br />
   
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Employee name</th>
            <th>Employee Department</th>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Task Budget</th>
            <th>Taken</th>
            <th>Approve</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request , index) in requests" :key=index>
            <td>{{request.employee.user.name}} </td>
            <td>{{request.employee.department}}</td>
            <td>{{request.task.title}}</td>
            <td>{{request.task.description}}</td>
            <td>{{request.task.budget}}</td>
            <td>{{request.approved}}</td>

            <td><button class="btn btn-success" v-on:click="requestApproved(request.id)">Approve</button></td>
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
        shouldRender:true
        
        }
    },
    methods: {
         getRequests(){
           
          this.$http.get('https://bounty-board.herokuapp.com/api/requestTasks?filter=[ ["approved","=","false"]]' ,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "accept": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              console.log(response.body.items)
                this.requests = (response.body.items)
                 })
            .catch(function (error) {
                 console.log(error.body.errors[0].details);
                 this.alert ( error.body.errors[0].details);
               })
        },
        requestApproved(id){

           let  headers= {'Authorization' : 'Bearer '+this.$cookies.get('user').access_token  }
          let data = {approved: 1}

           this.$http.post('https://bounty-board.herokuapp.com/api/requestTasks/'+id,data, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/tasks'});
                 })
            .catch(function (error) {
                 console.log('err   '+error.body.errors[0].details);
                 this.alert = error.body.errors[0].details;
               })

              // window.location.reload(true) not working so we 
        },
          
        
    },
     created:function() {
       if(this.$cookies.get('user').user.user.type == 'admin') this.$shouldRender=true
        else this.$shouldRender=false
      console.log(this.$cookies.get('user').user.type)
            this.getRequests()
        
    },
    components: {
        Alert,
        Nav
    }
    }
</script>

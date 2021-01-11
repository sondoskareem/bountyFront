<template>
  <div class="details container">
    <Alert v-if="alert" v-bind:message="alert" />

    <h1 class="page-header">{{task.title}}</h1>
     <div style="margin-bottom:10px">
            <router-link class="btn btn-default mb-30" v-bind:to="'/tasks/'">Back</router-link>
    </div>
    <ul class="list-group" >
            <li class="list-group-item"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span> {{task.description}}</li>
            <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> {{task.department}}</li>
            <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> {{task.deadline}}</li>
            <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> {{task.budget}}</li>
            <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> {{task.status}}</li>
        </ul>

    <h4 class="page-header">Requirments</h4>

        <ul class="list-group" v-for="(requirment , index) in task.requirments" :key=index>
            <li class="list-group-item"> {{requirment.requirment}}</li>
            <li class="list-group-item">{{requirment.done}}</li>
        </ul>

         <h4 class="page-header">Assets</h4>

        <ul class="list-group" v-for="(asset , index) in task.assets" :key=index>
            <li class="list-group-item"> Image {{index+1}} => {{asset.asset}}</li>
            <!-- <img :src = 'https://bounty-board.herokuapp.com/api/{{asset.asset}}'/> -->
        </ul>
  </div>
</template>

<script>
    import Alert from '../Alert'
    import Nav from '../Nav'
export default {
  
    name:'Viewtasks',
    data(){
        return{
        task:'',
        alert:'',
        user:this.$cookies.get('user').user,
            
        }
        },
  methods:{
      fetchTak(id){
          this.$http.get('https://bounty-board.herokuapp.com/api/tasks/showDetails/'+id,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              // console.log(response.body.items)
                this.task = (response.body)
                console.log(response.body)

                 })
            .catch(function (error) {
                 console.log('err '+error.body.errors[0].details);
                //  this.alert = error.body.errors[0].details; 
               }) 
      },
  },
  created: function(){
      this.fetchTak(this.$route.params.id);
  },
   components: {
        Alert,
        Nav
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

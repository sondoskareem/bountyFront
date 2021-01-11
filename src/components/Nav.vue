<template>
     <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/tasks">Bounty Board</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/tasks">Tasks</router-link></li>
            <li><router-link  v-if="user.type == 'admin'" to="/employees" >Employees</router-link></li>
            <li><router-link  v-if="user.type == 'employee'" :to="{ name: 'employee/tasks' , query:{myTasks} }" >My Tasks</router-link></li>
            <li><router-link  v-if="user.type == 'employee'" :to="{ name: 'employee/requests' , query: {myRequests}  }">My Request</router-link></li>
            <li ><router-link v-if="user.type == 'admin'" :to="{ name: 'requests' , query: {query} }">Request</router-link></li>
            
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a style="cursor:pointer">{{user.name}}</a></li>
            <li><a style="cursor:pointer" v-on:click="logout" >Logout</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
</template>
<script>
export default {
  name: 'nav',
  data () {
    return {
      user:this.$cookies.get('user').user.user,
      query :'filter=[["approved","=","false"]]' ,
      myTasks :'approved=1' ,
      myRequests :'approved=0' ,
      alert:''
    }
  },
   methods: {
         logout(){
            let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
                let  body= {}
        this.$http.post('https://bounty-board.herokuapp.com/api/logout',body,{headers})
            .then(function (response){
                console.log('Success  '+response)
                this.$router.push({path: '/', query: {alert: 'logout Successfully'}});
                 })
            .catch(function (error) {
                 console.log('err   '+error.body.errors[0].details);
                 this.alert = error.body.errors[0].details;
               })
       
        },
    },
     created:function() {
      console.log('user  '+this.$cookies.get('user').user.user.type)
      console.log(this.$shouldRender)
        
    },
}
</script>
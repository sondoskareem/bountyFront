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
    <h1 class="page-header">Add asset</h1>
    <form v-on:submit="addTask">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
                <label>Asset</label>
                <input type="text" class="form-control" placeholder="Asset" v-model="task.asset">
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
        
    },
    components: {
        Alert,
        Nav
    }
    }
</script>

<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Customer</h1>
    <form v-on:submit="addCustomer">
        <div class="well">
            <h4>Customer Info</h4>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Title" v-model="customer.title">
            </div>
            <div class="form-group">
                <label>Body</label>
                <input type="text" class="form-control" placeholder="Body" v-model="customer.body">
            </div>
        </div>  
      
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>
    import Alert from '../Alert'
    export default {
    name: 'edit',
    data () {
        return {
        customer: {},
        alert:''
        }
    },
    methods: {
        addCustomer(e){
            
                let newCustomer = {
                    title: this.customer.title,
                    body: this.customer.body,
                }

                this.$http.post('https://jsonplaceholder.typicode.com/posts', newCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Customer Added'}});
                    });

                e.preventDefault();
           
        }
    },
    components: {
        Alert
    }
    }
</script>

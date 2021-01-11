<template>
<div class="row">
    <Nav />
 <div class="add container" v-if=" user.user.type == 'admin'">
 <div class="mb-30">
           <router-link class="btn btn-default mb-30" v-bind:to="'/edit/task/'+this.$route.params.id">Back</router-link>
    </div>
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add asset</h1>
    <form v-on:submit="addAsset" enctype="multipart/form-data">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
                <label>Asset</label>
                <input type="file" @change="onFileChanged" accept="image/*" class="form-control" placeholder="Asset" >
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
        selectedFile: null

        }
    },
    methods: {
        onFileChanged (event) {
                 this.selectedFile = event.target.files[0]
            },
            
            addAsset(e){
                 const formData = new FormData()
                formData.append('asset', this.selectedFile)
                formData.append('task_id',this.$route.params.id)
                    let newAsset = {
                    asset: this.selectedFile,
                    task_id:this.$route.params.id
                }

                let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
                    console.log(newAsset)
               
        this.$http.post('https://bounty-board.herokuapp.com/api/asset',formData, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/tasks', query: {alert: 'Asset Added'}});

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

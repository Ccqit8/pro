<template>
    <div>登录页面</div>
</template>
<script>
    var axios=require('axios');
  
    export default {
      
        created(){
            this.$http.get(this.$api.login).then(res=>{
                console.log(res.data);
            })
        }
    }
</script>

<style scoped>

</style>
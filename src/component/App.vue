<template>
    <div>
        测试环境
        <router-view></router-view>
        <el-rate
    v-model="value"
    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
  </el-rate>
    </div>
</template>

<script>
    export default {
      data(){
          return{
              value:2
          }
      }
       
    }
</script>

<style scoped>

</style>
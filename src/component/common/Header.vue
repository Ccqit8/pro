<template>
    <el-dropdown class="loginOut">
    <span class="el-dropdown-link">
        <span>你好,{{uname}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native='loginOut'>注销登出</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        data(){
            return{
                uname:'admin'
            }
        },
        methods:{
            loginOut(){
                console.log(111);
                this.$router.push({name:'login',path:'/login'});
            }
        }
    }
</script>

<style scoped>
    .loginOut{
        padding-right: 30px;
        display: block;
        text-align: right;
    }
</style>
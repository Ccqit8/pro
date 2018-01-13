<template>
        <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu :index="item.title" v-for='item in category' :key='item.title'>
                <template slot="title">
                    <i class="el-icon-d-caret"></i>
                    <span>{{item.title}}</span>
                </template>
                    <el-menu-item :index="citem.title" v-for='citem in item.children' :key='citem.title'>
                            <router-link :to="citem.path">{{citem.title}}</router-link>
                    </el-menu-item>
                   
            </el-submenu>
        </el-menu>
</template>
<script>
    export default {
        data(){
            return{
               category:[
                   {
                       title:'资源下载',
                       children:[
                           {
                               title:'内容管理',
                               path:'/a'
                           },
                           {
                               title:'内容分类',
                               path:'/b'
                           }
                       ]
                   },
                   {
                       title:'产品商城',
                       children:[
                           {
                               title:'内容管理',
                               path:'/a'
                           },
                           {
                               title:'内容分类',
                               path:'/b'
                           }
                       ]
                   },
                   {
                       title:'订单管理',
                       children:[
                           {
                               title:'内容管理',
                               path:'/a'
                           },
                           {
                               title:'内容分类',
                               path:'/b'
                           }
                       ]
                   }
               ] 
            }
        },
        methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
    }
</script>

<style scoped>

</style>
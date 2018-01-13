import Vue from 'vue';

// 导入 根组件
import App from './component/App.vue';
// element-ui插件的引入 和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import axios from 'axios';
import api from './js/api_config.js';
// 一配置, 以后所有的请求就会自动使用这个域名
axios.defaults.baseURL='http://157.122.54.189:9095';
Vue.prototype.$http=axios;
Vue.prototype.$api=api;
// 导入 vue-router 
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入 vue-router 的 路由配置
import routerConfig from './router/index.js';

// console.log(routerConfig);
new Vue({
    el: "#app",
    router: new VueRouter(routerConfig),
    render: function (createElement) {
        return createElement(App);
    },
    mounted(){
        this.$http.get(this.$api.islogin).then(res=>console.log(res))
        
    }
    
})
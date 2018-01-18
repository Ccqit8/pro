import Vue from 'vue';

// 导入 根组件
import App from './component/App.vue';
// element-ui插件的引入 和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 初始化默认样式
import 'normalize.css';
import './less/index.less';
Vue.use(ElementUI);
import axios from 'axios';
import api from './js/api_config.js';
// 一配置, 以后所有的请求就会自动使用这个域名
axios.defaults.baseURL='http://localhost:8899';
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
Vue.prototype.$api=api;
// 导入 vue-router 
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入 vue-router 的 路由配置
import routerConfig from './router/index.js';
import beforeEach from './router/beforeEach.js';

let router=new VueRouter(routerConfig);
router.beforeEach(beforeEach);
new Vue({
    el: "#app",
    router:router,
    render: function (createElement) {
        return createElement(App);
    },
    mounted(){
        this.$http.get(this.$api.islogin).then(res=>console.log(res))
        
    }
    
})
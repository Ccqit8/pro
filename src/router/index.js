import Login from '../component/login/Login.vue';
import Admin from '../component/Admin/admin.vue';
import GoodsCategoryList from '../component/Admin/goods/goods-category/goodsCategoryList.vue';
import GoodsCategoryEdit from '../component/Admin/goods/goods-category/goodsCategoryEdit.vue';
import GoodsContentList from '../component/Admin/goods/goods-content/goodsContentList.vue';
import GoodsContentEdit from '../component/Admin/goods/goods-content/goodsContentEdit.vue';
let adminChildren=[
    {
       name:'GoodsCategoryList',
       path:'goods/category/list',
       component:GoodsCategoryList
    },
    {
        name:'GoodsCategoryEdit',
        path:'goods/category/edit/:id',
        component:GoodsCategoryEdit
     },
     {
        name:'GoodsContentList',
        path:'goods/content/list',
        component:GoodsContentList
     },
     {
        name:'GoodsContentEdit',
        path:'goods/content/edit/:id',
        component:GoodsContentEdit
     },

];
export default {
    routes: [
        // 登录注册
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        // 首页
        {
            name:'admin',
            path:'/admin',
            component:Admin,
            children:adminChildren
        },
          // 默认首页   
        {
            path:'/',
            redirect:"admin"
        }
       
    ]
}
import Login from '../component/login/Login.vue';
import Admin from '../component/Admin/admin.vue';
export default {
    routes: [{
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name:'admin',
            path:'/admin',
            component:Admin
        }
       
    ]
}
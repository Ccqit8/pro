import api from '../js/api_config.js';
import axios from 'axios';

export default

function (to, from, next) {
    axios.get(api.islogin).then(res => {
        let isLogin = false;
        if (res.data.code == "logined") {
            isLogin = true;
        }
        var nextPageName = to.name;
        // console.log(nextPageName != "login", !isLogin);

        if (nextPageName == "login" && isLogin) {
            next('/admin');
        } else if (nextPageName != "login" && !isLogin) {
            next({
                path: '/login',
                query: {
                    nextPage: to.fullPath
                }
            });
        } else {
            next();
        }
    })

}
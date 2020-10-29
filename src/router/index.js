import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from "../views/login";
import Main from "../views/main/main";
import list from "../views/list";
import Categoryadd from "../views/main/Category/add";
import Categoryindex from "../views/main/Category/index";
import Useredit from "../views/main/user/Useredit";
import Categoryedit from "../views/main/Category/edit";
import Homestayadd from "../views/main/homestay/add";
import Homestayindex from "../views/main/homestay/index";
import Homestayedit from "../views/main/homestay/edit"
import Echartscom from "../views/main/echarts/Echarts";
/*
* loading
* 封装
* 上传
* 富文本编辑器  wangedit
* 城市数据
*
* */
let router = new VueRouter({
    routes:[
        {path:'/',component:Main,name:'index',
            redirect:"echarts",
            meta:{
                auth:true
            },
        children:[
            {
                path: "categoryadd", component: Categoryadd, name: 'categoryadd',
                meta: {
                    title: '分类添加',
                    auth: true
                }
            }, {
                path: "homestayadd", component: Homestayadd, name: 'homestayadd',
                meta: {
                    title: '民宿添加',
                    auth: true
                }
            },{
                path: "homestayedit/:id", component: Homestayedit, name: 'homestayedit',
                meta: {
                    title: '民宿修改',
                    auth: true
                }
            },{
                path: "homestayindex", component: Homestayindex, name: 'homestayindex',
                meta: {
                    title: '民宿查看',
                    auth: true
                }
            },
            {
                path: "categoryindex",component: Categoryindex,name: 'categoryindex',
                meta: {
                    title: '分类查看',
                    auth: true
                }
            },
            {
                path: "categoryedit",component:Categoryedit,name: 'categoryedit',
                meta: {
                    title: '分类编辑',
                    auth: true
                }
            },
            {
                path: "Useredit",component: Useredit,name: 'Useredit',
                meta: {
                    title: '修改密码',
                    auth: true
                }
            },
            {
                path: "echarts",component: Echartscom,name: 'echarts',
                meta: {
                    title: '数据可视化',
                    auth: true
                }
            }
        ]
        },
        {path:'/login',component:login,name:'login',
            meta:{
                auth:false
            }
            },
        {path:'/list',component:list,
            meta:{
                auth:true
            }},

    ]
})

/*全局前置守卫    /==>/login   ==>list
 * 1.监听路由变化
 * 2.to
 *
 */
router.beforeEach((to,from,next)=>{
    if (to.meta.auth){
        let token = sessionStorage.getItem('token');
        token=token&&token.trim();
        if (token){
            next()
        }else{
            next({name:'login',query:{redirect:to.name}})
        }
    }else {
        next()
    }
    next();
});

export default router;
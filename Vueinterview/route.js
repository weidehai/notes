import VueRouter from "vue-router";
const Vuesmzq  = () => import("./Vuesmzq.vue");
import Vueroute from "./Vueroute.vue";

const routes = [
    {path:'/Vuesmzq',component:Vuesmzq},
    {
        path: '/Vueroute',
        component: Vueroute,
        children:[
            {
                path:"query",
                component:Vueroute.components.query
            },
            {
                path: "params/:id/:name",
                component: Vueroute.components.params
            }
        ]
    },
];

const router = new VueRouter({
    routes
});

//通过next可以改变导航行为
// router.beforeEach((to,from,next)=>{
//     console.log(to,from);
//     next()
// });
//没有next方法，只接受to和from记录参数
// router.afterEach((to,from)=>{
//
// });



export {router}
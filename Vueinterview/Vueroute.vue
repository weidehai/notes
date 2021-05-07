<template>
    <div id="route">
        <h1>{{title}}</h1>
        <router-link to="/Vueroute/query?id=10&name=weidehai"><el-link type="primary">query(?)传参</el-link></router-link>
        <router-link to="/Vueroute/params/12/weidehai"><el-link type="primary">params传参</el-link></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    /*
    **mvvm是什么？
    * mvvm相当于前端的mvc
    * model：数据模型。是后端的
    * view：前端视图
    * vm：将后端发来的数据进行处理在给视图展示
    * 完全的将前后端分离开了
    */


    /*
    **vue-router 是什么?它有哪些组件
    * 是一个js库，作用就是用来配合Vue.js管理前端路由
    * router-link
    * router-view
    */

    /*
    **active-class 是哪个组件的属性？
    * router-link,作用于当前的路由
    */

    /*
    *怎么定义 vue-router 的动态路由? 怎么获取传过来的值
    * 动态路由冒号后面加占位变量/path/:dynamic
    * 获取参数方法：
    * $route.params.dynamic
    * $route.query
    * $route.hash
    */

    /*
    *vue-router 有哪几种导航钩子?
    * 1.beforeEach beforeResolve afterEach  全局
    * 2.beforeEnter
    * 3.beforeRouteEnter beforeRouteUpdate beforeRouteLeave  组件内的
    */


    /*
    **$route 和 $router 的区别
    * 1.$route是一个跳转的路由对象，每一个路由都会有一个$route对象，是一个局部的对象，可以获取对应的name，path，params，query等
    * 2.$router是VueRouter的一个对象，通过构造函数得到的一个实例对象，这个对象中是一个全局的对象，他包含了所有的路由，包含了许多关键的对象和属性。
    */


    /*
    * vue-router响应路由参数的变化
    *使用watch监测$route
    */


    /*
    * vue-router传参
    * params,query,prop
    */

    /*
    *vue-router的两种模式
    * history模式
    * hash模式
    */


    /*
    *vue-router实现路由懒加载（ 动态加载路由 ）
    *const component = () => import("./component")
    */

    export default {
        data: function () {
            return {
                title: 'Vue路由',
            }
        },
        methods: {

        },
        created() {

        },
        beforeRouteEnter(to,from,next){
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            console.log("zujian" + to + from)
            next()
        },
        //进入子路由时触发
        beforeRouteUpdate(to,from,next){
            next()
        },
        beforeRouteLeave(to,from,next){
            next()
        },
        components: {
            query:{
                template:"<div><h3>query</h3><p>{{$route.query.id}}-----{{$route.query.name}}</p></div>"
            },
            params:{
                template:"<div><h3>params</h3><p>{{$route.params.id}}-----{{$route.params.name}}</p></div>"
            }
        }
    }
</script>

<style>

</style>
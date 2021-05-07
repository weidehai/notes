<template>
    <div id="app">
        <el-button><router-link to="/Vuesmzq"><el-link type="success">Vuesmzq</el-link></router-link></el-button>
        <el-button><router-link to="/Vueroute"><el-link type="success">Vueroute</el-link></router-link></el-button>
        <router-view></router-view>
    </div>

</template>

<script>
    /*
    *1.<keep-alive></keep-alive>的作用是什么?
    * 缓存子组件的数据
    * 2.如何获取dom
    * 给元素添加ref属性，然后通过this.$refs获取
    * 3.vue指令
    * v-bind，v-on，v-for,v-if,v-show,v-model,
    * 4.vue-loader是什么，使用他的用途有哪些
    * vue-loader是vue文件的加载器或者说是解释器，vue-loader允许将模板、样式、逻辑三要素整合在同一个文件中，
    * 将不同的组件抽离，以.vue文件后缀形成单文件组件格式，方便项目架构和开发引用。
    * 5.为什么使用key
    * 6.axios解决跨域
    * 7.scss的安装和使用
    * sass-loader node-sass  <style lang=scss>
    * 8.vue-cli项目中src目录结构
    * assets，view，component，router，store
    * 9.v-on可以监听多个方法吗
    * 10.分别简述computed和watch的使用场景
    * 11.$nextTick的使用
    * 12.vue组件中data为什么必须是一个函数
    * 为了让每一个vue实例维护一份属于自己的data，而不是共享
    * 13.vue事件对象的使用
    * 14.组件间的通信
    * 父---->子   子---->父
    * 15.Vue中双向数据绑定是如何实现的
    * object.defineproperty数据劫持，每个属性都有一个set和get方法，所有的属性赋值都要通过set方法，可以实现数据劫持
    * 16.单页面应用和多页面应用区别及优缺点
    * 17.vue中过滤器有什么作用及详解
    * 18.v-if和v-for的优先级
    * v-for高
    * 19.assets和static的区别
    * assets在打包时会以模块的形式导入，static是在public目录下的静态资源文件夹
    * 20.vue常用的修饰符
    * v-on:click.stop v-on:click.prevent v-on:click.capture v-on:click.self v-on:click.once v-on:click.passive
    * 修饰符可以串联
    * v-on:click.stop.prevent
    * 键盘修饰符
    *  v-on:keyup.keycode|keysymbol
    * .enter：回车键
    * .tab：制表键
    * .delete：含delete和backspace键
    * .esc：返回键
    * .space: 空格键
    * .up：向上键
    * 组合键
    * v.ctrl  .alt   .shift  .meta
    * v-on:keypress.alt.13
    * 鼠标按钮
    * .left   .right   .middle
    * 其他
    * .lazy---改变后才触发 .number----转化为number类型  .trim-----过滤掉首尾空格
    * @@@@补充passive是在浏览器对于移动端滑动的优化，移动端touch事件同样有cancelable属性，表示是否可以通过prevent老阻止默认事件，默认是true，也就是说每一次touch事件
    * 都要去判断cancelable的值，这样就会造成滑动延迟不顺畅，所以为了优化，所以设置了passive，passive默认为true就是不去判断cancelable，直接执行默认事件
    * prevent，stop(阻止事件默认行为，阻止事件冒泡)
    * 21.数组更新检测
    * 当数组采用push()pop()shift()unshift()splice()sort()reverse()方法更新时可以检测到，但是items[0] = {}这样检测不到items.length = 0这样也检测不到
    * 所以像在任意位置删除/添加元素并且更新需要使用另外的方式
    * 1.Vue.set(vm.items, indexOfItem, newValue)
    * 2.items.splice(indexOfItem, 1, newValue)
    * 3.items.splice(newLength) 清空数组
    * 对象的更新
    * 1.Vue.set(userProfile, 'age', 27)  单个
    * 2.userProfile = Object.assign({}, vm.userProfile, {age: 27,favoriteColor: 'Vue Green'})   批量
    * 22.Vue.set视图更新
    * 23.自定义指令详解
    * 通过Vue实例的directive属性设置
    * // 注册一个全局自定义指令 `v-focus`
    * Vue.directive('focus', {
    *    // 当被绑定的元素插入到 DOM 中时……
    *    inserted: function (el) {
    *    // 聚焦元素
    *    el.focus()
    *    }
    * })
    * 24.vue的两个核心点
    * 1.数据驱动  ---实时监测数据的变化来渲染视图，数据是驱动力，监测数据(数据观测)原理：利用的是ES5Object.defineProperty和存储器属性: getter和setter
    * 基于依赖收集
    * 1、将原生的数据改造成 “可观察对象”，通常为，调用defineProperty改变data对象中数据为存储器属性。一个可观察对象可以被取值getter，也可以被赋值setter。
    * 2、在解析模板，也就是在watcher的求值过程中，每一个被取值的可观察对象都会将当前的watcher注册为自己的一个订阅者，并成为当前watcher的一个依赖。
    * 3、当一个被依赖的可观察对象被赋值时，它会通知notify所有订阅自己的watcher重新求值，并触发相应的更新，即watcher对象中关联的DOM改变渲染。
    * 2.组件系统
    * 一个应用可以看成是多个组件树来构成的，可以自定义任意的组件，一般是需要复用的
    * 组件的核心（每一个组件都是一个vue实例）
    * 1、模板（template）：模板声明了数据和最终展现给用户的DOM之间的映射关系。
    * 2、初始数据（data）：一个组件的初始数据状态。对于可复用的组件来说，这通常是私有的状态。
    * 3、接受的外部参数(props)：组件之间通过参数来进行数据的传递和共享。
    * 4、方法（methods）：对数据的改动操作一般都在组件的方法内进行。
    * 5、生命周期钩子函数（lifecycle hooks）：一个组件会触发多个生命周期钩子函数，最新2.0版本对于生命周期函数名称改动很大。
    * 6、私有资源（assets）：Vue.js当中将用户自定义的指令、过滤器、组件等统称为资源。一个组件可以声明自己的私有资源。私有资源只有该组件和它的子组件可以调用。
    * 25.vue和jQuery的区别
    * jQuery是使用选择器（$）选取DOM对象，对其进行赋值、取值、事件绑定等操作，其实和原生的HTML的区别只在于可以更方便的选取和操作DOM对象，而数据和界面是在一起的。比如需要获取label标签的内容：$("lable").val();,它还是依赖DOM元素的值。
    * Vue则是通过Vue对象将数据和View完全分离开来了。对数据进行操作不再需要引用相应的DOM对象，可以说数据和View是分离的，他们通过Vue对象这个vm实现相互的绑定。是将原有的直接操作dom的思想转变到操作数据上去
    * 26.引进组件的步骤
    * 1.html引入：定义组件 component{name，{}} --- html标签引入<name></name>
    * 2.js引入：import xxx from 组件文件路径  ---- vue实例components:{xxxx}
    * 27.Vue-cli打包命令是什么？打包后会导致路径问题，应该在哪里修改
    * npm run build,在vue.config.js文件中修改
    * module.exports = {
        publicPath: './'
       }
    * 28.三大框架的对比
    * 29.跨组件双向数据绑定
    * 1、利用对象的引用关系  父组件绑定一个引用类型数据到子组件上，子组件将这个数据绑定到v-model上实现双向数据绑定
    * 2、子组件利用事件触发像事件监听者(父组件)传递更新的数据
    * 3、.sync，方法2的语法糖
    * 4、v-model(v-model的实现，监听了input事件)
    * 30.delete和Vue.delete删除数组的区别
    * delete只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
    * Vue.delete 直接删除了数组 改变了数组的键值
    * 31.SPA首屏加载慢如何解决
    * 1.配置externals 它所包含的文件类型将被排除，避免不必要的静态资源包含进来，导致编译出的文件过大
    * 2.配置路由组件懒加载
    * 3.将公用的JS库通过script标签外部引入，减小 app.bundel 的大小
    * 4.模块化
    * 32.Vue-router跳转和location.href有什么区别
    * 1.location.href 会刷新，如果本地之前已经载入过该页面并有缓存，那么会直接读取本地的缓存，缓存机制是由本地浏览器设置决定的
    * 2.vue-router
    * 两种模式：hash   history
    * 1、hash是通过监听hashchange来改变页面
    * 2、history：两个方法：pushstate和popstate
    * 都不会刷新页面，转跳不会刷新整个页面，而是按需加载，局部刷新
    * 33.vue slot
    * 不具名和具名
    * 34.你们vue项目是打包了一个js文件，一个css文件，还是有多个文件？
    * 多个
    * 35.Vue里面router-link在电脑上有用，在安卓上没反应怎么解决？
    * Vue路由在Android机上有问题，babel问题，安装babel polypill插件解决
    * 36.Vue2中注册在router-link上事件无效解决方法
    * click.native
    * 37.RouterLink在IE和Firefox中不起作用（路由不跳转）的问题
    * 38.axios的特点有哪些
    * 39.请说下封装 vue 组件的过程？
    * 首先，创建一个组件
    * 然后，使用Vue.component()方法注册组件
    * 接着，如果子组件需要数据，可以在props中接受定义
    * 最后，子组件修改好数据之后，想把数据传递给父组件，可以使用emit()方法
    * 40.vue 各种组件通信方法（父子 子父 兄弟 爷孙 毫无关系的组件）
    * 41.vue mock数据
    * mockjs:用于接受前端请求返回数据，开发模拟
    * 42.vue封装通用组件
    * 43.vue初始化页面闪动问题
    * [v-cloak] {
        display: none;
      }
    * 44.vue禁止弹窗后的屏幕滚动
    *
    * 45.vue更新数组时触发视图更新的方法
    * 46.vue如何引进本地背景图片
    * require(url) import xxx from url
    * 47.vue如何引进sass
    * 48.vue修改打包后静态资源路径的修改
    *
    *
    *
    *
    *
    *
    *
    *
    */

    export default {
        data: function () {
            return {}
        },
        methods: {

        },
    }
</script>

<style lang="scss">
    #app{
        a{
            text-decoration: none;
        }
    }
</style>
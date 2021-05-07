<template>
    <div id="smzq">
        <h1>{{name}}</h1>
        <el-button type="success" @click="changename">update</el-button>
        <el-button type="danger" @click="destroyvm">destroy</el-button>
    </div>

</template>

<script>
    /*
    ***什么是vue生命周期
    * 1.就是Vue对象从创建到销毁的过程
     */

    /*
    ***Vue生命周期的作用是什么
    *和生命周期关联的是，在生命周期不同阶段有相应的钩子函数，提供给用户在不用时机执行相应代码的机会
     */

    /*
    *第一次页面加载会触发哪几个钩子
    *beforecreate,created,beforemount,mounted
    */

    /*
    *4.简述每个周期具体适合哪些场景
    * beforecreate        这个阶段的时候data和method都是拿不到的（通常在实例以外调用）
    * created             这个可以调用实例的数据和实例的方法（带异步数据请求的方法可以放在这里）
    * mounted             用于初始数据的dom渲染（需要操作dom的方法放这里）
    * updated             用于对数据更新做统一处理 （如果想分别区分不同的数据更新，同时进行dom操作就使用$nextTick）
    * beforedestroy       将要离开当前页面(子组件)前
    */

    /*
    *5.created和mounted的区别
    * created      仅仅是将vue实例的属性和方法进行了初始化，还没有将模板编译并渲染到页面
    * mounted      已经将模板编译好并进行渲染
    */


    /*
    *6.vue获取数据在哪个周期函数
    *一般放在created
    */


    /*
    *7.请详细说下你对vue生命周期的理解？
    *就是在Vue实例执行的不同阶段，给他一个对应的函数来在这些阶段前后执行一个代码，达到某些目的
     */

    export default {
        data:function () {
            return{
                name:'Vue生命周期',
            }
        },
        methods:{
            changename(){
                this.name = 'liming';
            },
            destroyvm(){
                this.$destroy();
            },
        },
        beforeCreate() {
            console.log('beforecreated')
        },
        created() {
            console.log('created')
        },
        beforeMount() {
            console.log('beforemount')
        },
        mounted() {
            console.log('mounted')
        },
        beforeUpdate() {
            console.log('beforeupdate')
        },
        updated() {
            console.log('updated')
        },
        beforeDestroy() {
            alert("leave")
        },
        destroyed() {
            console.log('destoryed')
        }
    }
</script>

<style>

</style>
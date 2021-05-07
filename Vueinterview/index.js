import Vue from 'vue';
import VueRouter from "vue-router";
import {Button, Link} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import {router} from "./route.js";
import App from './App.vue';

Vue.use(Button);
Vue.use(Link);
Vue.use(VueRouter);

let vm = new Vue({
    el:'#app',
    render:c=>c(App),
    router
});


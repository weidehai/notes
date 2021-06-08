# vue-cli使用手册
官网：https://cli.vuejs.org/zh/  
@新建一个项目  
`vue create project_name`  
@vue-cli serve  
vue-cli serve开启一个本地服务器，并生成一个虚拟的index.html


vuecli配置
代理
eslint
路径

我的vue.config.js





babel.config.js

https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist

默认情况下vue脚手架的配置

module.exports = {

 presets: ["@vue/cli-plugin-babel/preset"],

};

默认情况下vuecli不会对node_module中的包做转化，如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来

babel 编译只会编译一些语法，只会把 es6 的语法转化成 es5的形式。但是也仅仅是书写方式的变化。比如：箭头函数换成匿名函数等。不会转换没有的方法。比如：Array.find 等等新的方法。这个就需要一个垫片。promise 就是这样的，如果需要支持低版本浏览器，就需要加垫片 babel-poyfill
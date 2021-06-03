组件标签要严格闭合
页面这样写
<helloworld />
<aaa />
浏览器会渲染成
<helloworld>
<aaa>
</aaa>
</helloworld>
这样aaa就变成了helloworld的子节点了，我们本意是两个组件应该是同级的，应该这样写
<helloworld>
</helloworld>
<aaa>
</aaa>

组件的名字要是小写，直接把组件标签写在html中，vue是通过原生api获取html，浏览器会把所有html转化成小写，如果组件名是大写，就匹配不到了，如果组件写在template中就没问题，应为template不经过浏览器
## 解析dom模板时的注意事项

有些 HTML 元素，诸如 <ul>、<ol>、<table> 和 <select>，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

<table>
  <blog-post-row></blog-post-row>
</table>
这个自定义组件 <blog-post-row> 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 is attribute 给了我们一个变通的办法：

```
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是如果我们从以下来源使用模板的话，这条限制是不存在的：

字符串 (例如：template: '...')
单文件组件 (.vue)

`<script type="text/x-template">`

原因：使用template字符串和vue文件或者`<script type="text/x-template">`时情况下，在html被浏览器解析前会先被vue编译器编译，vue编译后的html是符合html规范的

如果不经编译将html交给浏览器就会渲染出错

## vue组件名

![image.png](https://i.loli.net/2021/05/14/qtjNc5ib2KzvW6V.png)

原因同上：vue内部会自动把组件名映射到短横线命名（遵守w3c规范），所以直接使用必须用短横线，如果是模板（会经过vue编译的）就可以使用其他方式，这会在vue编译的时候自动识别

## html自定义标签命名规范

![image.png](https://i.loli.net/2021/05/14/3T1zJIbAYarGncx.png)


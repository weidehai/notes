## BFC概念

块级格式化上下文

目的就是形成一个完全独立的空间，让空间中的子元素不会影响到外面的布局

如何触发BFC

1.float不为none

2.position不为relative和static

3.overflow为auto scroll hidden

4.display为table-cell和inline-block

## 父元素高度坍塌

一个父元素中有多个子元素，子元素设置了float，就会造成父元素高度坍塌

原理是：浮动元素脱离了文档流，就不存在于父元素中了，所以父元素不会被子元素撑开

解决：

1.触发BFC 原理：bfc不会让父元素内的子元素影响其他元素布局，所以在计算高度时就会将子元素的高度包含进来

2.父元素也浮动（添加固定高度）

3.清除浮动

浮动会挤开被自身覆盖的元素

## margin塌陷
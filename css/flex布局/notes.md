## flex布局

当父盒子设置为flex布局，子元素的float,clear,vertical-align属性将失效

## 常见的父项属性

flex-direction:设置主轴方向（row,column,row-reverse,column-reverse）

justify-content：设置主轴上的子元素排列方式(flex-start:左到右,flex-end(贴到右边),center，space-around：平分剩余空间（分配到margin上）,space-betwwen:先两边贴边，在平分剩余空间)

flex-wrap：设置子元素是否换行（默认是不换行，如果盒子宽度超过了父盒子，即使给每个盒子设置了固定宽度，浏览器还是会自动压缩宽度，将空间平均分配给所有的盒子以满足在一行排列）

align-content：设置副轴上的子元素排列方式（多行）

align-items：设置副轴上的子元素排列方式（单行，flex-start(贴住上边),flex-end：贴住下边,center,stretch：首先要去掉子元素的固定高度，然后子元素就能占满父元素的高度）

flex-flow：flex-direction+flex-wrap

默认主轴是X方向，副轴是Y方向

## 常见的子项属性

flex:子项目占剩余空间的份数（默认是0，平分；1：占所有的剩余空间）

align-self：控制子项自己在副轴的排列方式

order：定义子项的排列顺序（前后顺序，数值越小越靠前）



一、img、input属于行内替换元素。height/width/padding/margin均可用。效果等于块元素。行内非替换元素，例如, height/width/padding top、bottom/margin top、bottom均无效果。只能用padding left、right和margin left、right改变宽度。
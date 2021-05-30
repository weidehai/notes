使用typescript注意事项

![image-20210530221747019](https://i.loli.net/2021/05/30/Q4rNVpCLE8ulDRY.png)

slate组件接受的editor事ReactEditor类型，而createEditor返回的是Editor类型，所以在使用typescript的时候需要扩展一下Editor类型（不使用typescript就不用，js不会做类型检查）

![image-20210530221939725](https://i.loli.net/2021/05/30/rGYwOCtlPxQEFVc.png)

![image-20210530222044599](https://i.loli.net/2021/05/30/S6XbkT8gnE3HVmj.png)

这样Editor就能够赋值给ReactEditor了

（解释：在slate源码中，createEditor返回类型是Editor（此时Editor是BaseEditor），没有ReactEditor类型的属性，而在我们使用的时候才给的扩展，此时Editor是BaseEditor & ReactEditor，但是我们是在slate编译好了才使用的，**也就是说此时createEditor函数被编译成了js文件，createEditor返回的真正对象其实还是Editor类型（应为在源码编译的时候我们并没有扩展Editor类型），但是这个不影响，因为ts不会对js文件检查**，只要类型文件定义了Editor是BaseEditor & ReactEditor，那就能赋值给ReactEditor）
class 是一个语法糖，本质还是function

class中的对象会被挂载到原型上

class person{

​	speak(){}

} =

function person(){}

person.prototype.speak = function(){}

## class中的constructor

如果类发生了继承，有显示声明了constructor就必须在这个方法的第一行调用super，其实就是在调用父类的constructor函数，并且将this绑定到子类的this，这样子类创建出来的对象就拥有了父类中初始化的实例属性


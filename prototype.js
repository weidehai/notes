instanceof原理
a instanceof b
R=b.prototype
L=a._proto__
在a的原型链上看是否能找到b的prototype属性


因此修改构造函数的prototype的contructor并不会影响构造函数所产生的对象。真正的原因是：一个对象的constructor是它的构造函数的prototype.constructor，
而每一个函数都有一个prototype，默认情况下，这个prototype有一个constructor属性，指向的是它自己
constructor其实没有什么用处，只是JavaScript语言设计的历史遗留物。由于constructor属性是可以变更的，所以未必真的指向对象的构造函数，只是一个提示。
不过，从编程习惯上，我们应该尽量让对象的constructor指向其构造函数，以维持这个惯例。
所以constructor并不是真实的构造函数，即使修改了这个属性，创建对象时解释器还是会将函数本身作为构造函数来创建对象

function a(){}
a.prototype = {
    desc:"no construcotr"
}
c=new a()
c._proto__ == a.prototype.constructor.prototype  //false


undefined 和 null 只有原始值 不可以有属性和方法 不会产生包装类
undefined/null 是一个原始值 不是对象 就没有原型 就调用不到Object.prototype(原型链最终原型)的 toString 方法
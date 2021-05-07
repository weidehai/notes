/*
ES6相关 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型
Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突
Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型
*/

{
    let a1 = Symbol.for("abc")
    let obj = {
        [a1]:123,
        'abc':123,
        "c":456
    };
    console.log(obj);
    for (let k in obj){
        console.log(k)
    }
    Object.getOwnPropertySymbols(obj).forEach(function (item) {
        console.log(obj[item])
    });
    Reflect.ownKeys(obj).forEach(function (item) {
        console.log(obj[item])
    })
}
//Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组

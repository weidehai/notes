/*
let const var 的比较
-----let:声明一个块级作用域的变量，不存在变量提升
-----var:var关键字声明的变量只能是全局和整个函数的，存在变量提升
-----const:和let一样，只不过const定义的变量必须初始化且在初始化之后不能再次赋值
@@@变量提升指的是变量的声明可以在使用之后，在变量声明之前使用变量值为undefined
 */

//console.log(a); //ReferenceError
console.log(b); //undefined
//console.log(c); //ReferenceError
{
    let a =10;
    var b = 1;
    const c = 20;
    console.log(a);
    console.log(c);
    a = 21;
    console.log(a);
    //console.log(c); //Uncaught TypeError: Assignment to constant variable.
}
//console.log(a); //ReferenceError
console.log(b); //1
//console.log(c);//ReferenceError





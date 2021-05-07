/*
****js中常见的内置几种错误类型：
* 1.RefereceError
* 2.TypeError
* 3.RangeError
* 4.SyntaxError
* 这几种类型都是由Error构造出来的，也就说Error是一切错误对象的基类
* 所以我们可以使用Error来构造一个属于自己的错误对象类型
* Error构造函数接受一个message参数
 */

//定义一个函数只能接受一个小于10的整数，若为其他则报错
function myError(num) {
    if(num<10){
        console.log("恭喜！！！输入正确");
    }else {
        throw new Error("输入错误，请输入一个小于10的数");
    }
}
try{
    myError(9);
}catch (e) {
    //函数抛出了一个错误对象，e就是这个错误对象,打印出这个对象的message
    console.log(e.message);
}






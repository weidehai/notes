let person = {
    name:'wedehai',
    age:'25',
    sex:'male'
}

export {person}


//export default 只能在定义时导出，不能先定义在导出，不用加大括号，只能出现一次
//export default 导出的文件 import的时候也不需要加大括号，直接就能拿到导出的那个对象或者变量

//export 可以在变量声明的时候导出，不用加大括号
//变量声明之后导出需要加大括号，可以批量导出


//node的模块化
//module.exports和exports
//exports是module.exports的引用，详见https://www.jianshu.com/p/03ab854a0616

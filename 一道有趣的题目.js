//一边循环，一边删除循环目标的元素

data = [1,2,3,4,5,6,7]
for (let index in data) {
    //index从0开始累加，每一次循环都会获取最新的data值，若index大于data的长度，就终止
    console.log(data[index])
    data.shift();
}


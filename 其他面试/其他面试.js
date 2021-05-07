/*
*写一个方法能够依次访问数组中的url，如果有失败可以重新访问，到达5次后放弃，使用promise异步,将结果作为数组返回
 */
let urls = ["http://www.baidu.com","http://www.taobao.com","http://www.aliyun.com"];

function batch_request(urls) {
    let result=[];
    for (let url of urls){
        pajax(url,"get",1).then(
            value =>{
                result.push(value);
                if(result.length===5){
                    console.log("所有请求结束，结果",result)
                }
            },
            reason =>{
                result.push(reason);
                if(result.length===3){
                    console.log("所有请求结束，结果",result)
                }
            }
        )
    }
}


//下面代码输出是什么
var a='www';console.log('value is '+(a==='www')?'www':'xxx')
//>>输出：www
//解释：+运算符优先级高于三目运算，是value is + （a==='www'）='value is true',字符串返回真，所以最后输出www
async function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject(5)
        },1000)
    }).then((value)=>{
        return "555" + value
    })
}
const {log} = console
//let r = fn1();
// r.then(
//     value => {
//         log(value)
//     }


// );

async function fn2() {
    try{
        let result = await fn1();
        log(result);
    }catch (e) {
        log(e);
    }

}

fn2();

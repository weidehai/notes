class Node{
    constructor(value=0) {
        this.value = value;
        this.next = null;
    }
}


class Linklist{
    constructor() {
        this.len = 0;
        this.head = null;  //head属性指向链表的首节点,初始化链表的首节点为一个空节点
        this.tail = null;
    }
    append(nodevalue){
        if(this.head === null) {
            this.head = new Node(nodevalue);
            this.tail = this.head;
        }else {
            this.tail.next = new Node(nodevalue);
            this.tail = this.tail.next;
        }
        this.len++
    }
    batch_append(nodevalue_list){
        for(let i of nodevalue_list){
            this.append(i);
        }
    }
    //从头到尾打印链表
    printf(){
        let node = this.head;
        while (node != null) {
            console.log(node.value);
            node = node.next;
        }
    }
}



let linklist = new Linklist();
linklist.batch_append([1,2,3,4,5,6,7,8,9]);
//linklist.printf();

function reverse(linklist,k) {
    if (k===0 || linklist.len<2) return linklist;
    let temparr = [];
    let len = linklist.len;
    let node = linklist.head;
    for (let i=0;i<len;i+=k){
        let nodelist = [];
        for(let j=0;j<k;j++){
            nodelist.push(node);
            node = node.next;
        }
        temparr.push(nodelist);
    }
    len = temparr.length;
    linklist.head = temparr[0].pop();
    linklist.tail = linklist.head;
    for(let i=0;i<len;i++){
        while(true){
            let node = temparr[i].pop();
            if(node === undefined){
                linklist.tail.next = null;
                break;
            }
            linklist.tail.next = node;
            linklist.tail = linklist.tail.next;
        }
    }
    linklist.printf();


}

reverse(linklist,3);
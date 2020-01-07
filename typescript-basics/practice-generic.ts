function sampleGeneric<A,B>(a: A, b: B): A & B {
    return{
        ...a,
        ...b
    }
}

const sampleResult = sampleGeneric({foo:1}, {bar : 2})

//interface + Generic
interface Items<T>{
    list: T[]
}

const items: Items<string> = { list : ['1']}

// type alias + Generic
type Items2<T> = {
    list: T[]
}
const items2: Items2<number> = {list : [1,2,3,4]}

// class + Generic
class Queue<T>{
    list: T[] = []
    enqueue(item: T){
       this.list.push(item)
    }
    dequeue(){
        return this.list.shift()
    }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
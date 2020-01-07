function testFunc(x: number, y: number): number{
    return x+y
}

testFunc(1,2)

function sumArray(array: number[]):number{
    return array.reduce((acc, cur)=> acc+cur, 0)
}

sumArray([1,2,3,4,5]) // 15

function noReturn():void{
    console.log('hi void')
}

noReturn()
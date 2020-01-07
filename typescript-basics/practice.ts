const test: string = "this variable must be string type" // 문자열
console.log('message',test)

let count: number = 1
count +=1 // 숫자

let isTrue: boolean = true // boolean

let numbers: number[] = [1,2,3,4,5] // 숫자배열

let messages: string[] = ['1','2','3'] // 문자열 배열

messages.push(1)//숫자 넣으려고 하면 안돼

let mightBeUndefined: undefined | number  = undefined // 숫자 or undefined

let nullableNumber: null | number = 3 // 숫자 or null

let color: 'green' | 'orange' | 'blue' // 셋 중 하나
color = 'blue'
color = 'red' // error
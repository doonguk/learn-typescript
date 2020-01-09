import React, {useState} from 'react'

function Counter(){
    const [count, setCount] = useState(0)
    // useState 는 타입 생략해도 가능
    // 하지만 state 값이 null 일 수도 있을 때, 복잡한 state를 선언할 때 에는 Generics를 사용한다.
    return(
        <div>
            <p>{count}</p>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
        </div>
    )
}

export default Counter
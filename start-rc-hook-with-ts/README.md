

# Use React Hook with TypeScript



## 1. useState

`useState` 설명을  위해 간단한 counter 컴포넌트 구현

```javascript
import React, {useState} from 'react'

function Counter(){
  const [count, setCount] = useState<number>(0)
  return(
      <div>
    		<p>{count}</p>
    		<button onClick={()=>setCount(count+1)}>+</button>
				<button onClick={()=>setCount(count-1)}>-</button>
     </div>
  )
}
```

- `useState` 에서 타입 지정은 `Generics` 로 state의 타입을 지정해 준다. 

- 타입을 생략해도 `useState` 가 알아서 인식하긴 한다. 
- 하지만 state의 타입이 **null 값 일 수도 있거나 복잡한 state 또는 배열** 을 선언 할 때에는 타입을 지정해 줘야한다.

```javascript
type people = { name: string, age: number }
const [person, setPerson] = useState<people | null>(null)

type item = {name: string}
const [items, setItems] = useState<item[]>([])
```

여기서 다음과 같은 표현도 가능하다.

```javascript
type item = {name: string}
const [items, setItems] = useState([] as item[])
```

여기서 선언된 `as`는 Type Assertion 이라는 문법이다. 편한거 사용하자~



## 2. Input 상태 관리하기

```javascript
import React, {useState} from 'react'

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target
  setForm({
    ...form,
    [name]: value
  })
}
//생략...
<input type="text" name="name" value={form.name} onChange={handleChange}/>
```

handleChange 이벤트의 인자인 `e` 의 타입을 지정 할 때 `React.ChangeEvent<HTMLInputElement>` 를 외우지 않아도 된다. `onChange` 이벤트에 마우스 올려서 보면 된다!



## 3. useReducer



##### ReducerCounter.tsx

```javascript
import React, {useReducer} from 'react'

type Action = {type:'INCREASE'} | {type:'DECREASE'}
function reducer(state: number, action: Action): number{
  switch (action.type) {
    case 'INCREASE':
      return state +1
    case 'DECREASE':
      return state-1
    default:
      throw new Error('Unhandled Action')
  }
}

export default function ReducerCounter(){
  const [count, dispatch] = useReducer(reducer, 0)
  const onIncrease = () => dispatch({type : 'INCREASE'})
  const onDecrease = () => dispatch({type : 'DECREASE'})
  return(
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  )
}
```

- `useReducer` 의 타입 지정은 파라미터로 전달되는 `reducer` 함수의 `state` 를 통해서 한다.
- `action` 의 타입부터 작성하자. 그래야 자동완성이 잘 된다.
- `redcuer`의  `action` 타입 지정은 | 를 이용하여 한다. | 는 '또는' 과 같은 의미이다.
- `reducer` 함수를 보면 파타미터 `state` 타입과 함수의 리턴값이 타입이 같다.**`reducer`를 구현 할 때에는 이렇게 파라미터로 받는 `state`의 타입과 함수 리턴값의 타입을 같게 하는 것이 중요하다.**



## 4. useRef

`useRef`는 기본적으로 `Generics`를 이용하여 타입 체킹을 한다.

#### 1 ) 변수 값 관리 

```javascript
const id = useRef<number>(0)
const decreaseId = () => {
  id.current -= 1
}
```

`Generics` 를 이용하여 타입을 지정 해준다. 이를 통해 `~.current` 의 값을 추론 할 수 있다.



#### 2 ) DOM 관리

기존에 만들었던 MyForm 컴포넌트를 재사용.

```javascript
import React, {useState, useRef} from 'react'

type MyFormProps = {
  onSubmit: (form: { name: string, description: string }) => void
}

type form = {
  name: string
  description: string
}

export default function MyForm({onSubmit}: MyFormProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<form>({
    name: '',
    description: ''
  })
  const {name, description} = form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      name : '',
      description: ''
    })
    if(!ref.current) return // 해당 값이 유효한지 체크!
    ref.current.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={handleChange} ref={ref}/>
      <input type="text" name="description" value={description} onChange={handleChange}/>
      <button type="submit">Submit</button>
    </form>
  )
}

```

- DOM 관리를 위한 `useRef` 는 일단 초기값은 null로 둔다.
- **타입스크립트 에서는 어떤 값이 `null` 이거나 `undefined` 될 수 있다면 해당 값이 유효한지 꼭 체크를 해줘야 한다.**

# Start Context API with Type Script



### 1. 프로젝트 준비 

투두 리스트 구현을 위한 TodoForm.tsx, TodoList.tsx, TodoItem.tsx 을 구현한다. ( Repository 코드 참고 )

### 2. Context 생성

상태를 관리하는 Context, Dispatch를 담당하는 Context 두개의 Contex를 생성한다. 만약 상태와 dispatch를 한개의 Context에 담게 되면 TodoForm.tsx 같은 상태가 필요하지 않는 컴포넌트도 상태가 바뀔 떄 마다 리렌더링이 발생하기 때문에 분리하여 작성해서 불필요한 렌더링을 방지 해야 한다.

##### src/contexts/TodoContext.tsx

```javascript
import {createContext} from 'react'

export type Todo = {
  id: number
  text: string
  done: boolean
}

type TodosState = Todo[]

const TodosStateContext = createContext<TodosState | undefined>(undefined)
```

`Context`의 타입은 `Generics` 로 지정해 준다. 추후, Provider를 사용하지 않을 때 에는 Context값이 `undefined` 일 수 있기 때문에 상태를 관리할 `Context`의 타입을 `TodosState | undefined`  로 지정해 준다.

```javascript
import {createContext, Dispatch} from 'react'

export type Todo = {
  id: number
  text: string
  done: boolean
}

type TodosState = Todo[]
const TodosStateContext = createContext<TodosState | undefined>(undefined)
const Action = 
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number }

type TodosActions = Dispatch<Actions>
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined)
```

**`React` 패키지에서 불러온 `Dispatch`에 `Generics`로 action 타입을 넣어주게 되면 나중에 action을 `dispatch`할 때 타입을 검사 할 수 있게 된다.**  state를 담당하는 context를 만든 것 처럼 dispatch를 담당하는 context도 만들어 준다.



### 2. Reducer 생성

```javascript
(...코드생략)
export function todosReducer(state: todosState, action: Action): todosState{
  switch(action.type){
    case 'CREATE': {
      const nextId = Math.max(...state.map( todo => todo.id))
      return state.concat({id: nextId, text: action.text, done: false})
    }
    case 'TOGGLE': {
      return state.map( todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)
    }  
    case 'REMOVE': {
      return state.filter(todo => todo.id !== action.id)
    }
    default:
      throw new Error('Unhandled Action!')
  }
}
```

`typescript`에서는 `action`에 타입을 지정해 주게 되면 reducer를 작성 할 때 자동완성이 되기 때문에 편하다.



### 3. TodosProvider 생성

위에서 작성한 TodosStateContext와 TodosDispatchContext의 Provider를 함께 사용하는 Provider를 만들어보자.

```javascript
import React, { createContext, Disptch, useReducer } from 'react'
(...코드 생략)
export function TodosContextProvider({children}: {children: React.ReactNode}){
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true
    },
    {
      id: 2,
      text: 'TypeScript 배우기',
      done: true
    },
    {
      id: 3,
      text: 'TypeScript 와 Context API 함께 사용하기',
      done: false
    }
  ])
  return(
    <TodosDispatch.Provider value={dispatch}>
  		<TodosStateContext.Provider value={todos}>
        {children}
    	</TodosStateContext.Provider>
		</TodosDispatch.Provider>
  )
}
```



### 4. Custom Hook 작성

```javascript
const todos = useContext(TodosStateContext)
```

컴포넌트에서 `Context`를 불러 사용할 때에는 위와같이 사용한다. 하지만 처음에 `Context`를 선언 할 때 타입이 `TodosState | undefined`  일 수 있었다. 따라서 `undefined` 처리를 해줘야 한다.

```javascript
const todos = useContext(TodosStateContext)
if(!todos) return null
```

하지만 이렇게 하면 코드가 깔끔하지도 않고 타입을 까먹고 작성 안 할수도 있고,, Custom hook을 만들어주는게 더 편하다.

```javascript
//TodoContext.tsx
const React, {createContext, Dispatch, useReducer, useContext} from 'react'
(...코드생략)
export function useTodosState(){
  const state = useContext(TodosStateContext)
  if(!state) throw new Error('TodosProvider not found');
  return state
}
export function useTodosDispatch(){
  const dispatch = useContext(TodosDispatchContext)
  if(!dispatch) throw new Error('TodosProvider not found');
  return dispatch
}
```



### 5. TodosContextProvider 사용

```javascript
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodosContextProvider } from './contexts/TodosContext';

const App = () => {
  return (
    <TodosContextProvider>
      <TodoForm />
      <TodoList />
    </TodosContextProvider>
  );
};

export default App;
```



### 6. 정리

- `Context API`를 활용 할 때 `useReducer`를 활용하면 편하다.
- 상태전용 `Context`와 dispatch 전용 `Context`를 만들면 편하다.
- `Context`를 만들고 나서 `Custom hook`을 만들어 이용하면 더 편하다.



 
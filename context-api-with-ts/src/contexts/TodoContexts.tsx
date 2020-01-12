import React, {createContext, Dispatch, useReducer, useContext} from 'react'

export type Todo = {
  id: number;
  text: string;
  done: boolean
}

type TodoState = Todo[]
const TodosStateContext = createContext<TodoState | undefined>(undefined)

type Action =
  | {type: 'CREATE', text: string}
  | {type: 'TOGGLE', id: number}
  | {type: 'REMOVE', id: number};

type TodoDispatch = Dispatch<Action>
const TodosDispatchContext = createContext<TodoDispatch | undefined>(undefined)

function todosReducer(state: TodoState, action:Action):TodoState {
  switch(action.type){
    case 'CREATE': {
      const nextId = Math.max(...state.map(el => el.id)) +1
      return state.concat({id : nextId, text: action.text, done : false})
    }
    case 'TOGGLE': {
      return state.map( todo => todo.id === action.id ? {...todo, done : !todo.done} : todo)
    }
    case 'REMOVE': {
      return state.filter(todo => todo.id !== action.id)
    }
    default:
      throw new Error('Unhandled Action')
  }
}

export function TodosContextProvider({ children }: { children: React.ReactNode }) {
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
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

export function useTodosState(){
  const state = useContext(TodosStateContext)
  if(!state) throw new Error('TodoProvider does not found')
  return state
}

export function useTodosDisaptch(){
  const dispatch = useContext(TodosDispatchContext)
  if(!dispatch) throw new Error('TodoProvider does not found')
  return dispatch
}
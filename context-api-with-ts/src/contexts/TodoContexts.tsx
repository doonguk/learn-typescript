import {createContext, Dispatch} from 'react'

export type Todo = {
  id: number;
  text: string;
  done: boolean
}

type TodoState = Todo[]
const todoStateContext = createContext<TodoState | undefined>(undefined)

type Action =
  | {type: 'CREATE', text: string}
  | {type: 'TOGGLE', id: number}
  | {type: 'REMOVE', id: number};

type TodoDispatch = Dispatch<Action>
const todoDispatchContext = createContext<TodoDispatch | undefined>(undefined)

function TodoReducer(state: TodoState, action:Action):TodoState {
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

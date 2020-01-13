import {useSelector, useDispatch} from "react-redux"
import { useCallback } from 'react'
import {RootState} from "../modules"
import {addTodo, removeTodo, toggleTodo} from "../modules/todos"

export default function useTodos(){
  const todos = useSelector( (state: RootState) => state.todos)
  const dispatch = useDispatch()
  const onAddTodo = useCallback((text: string)=>dispatch(addTodo(text)),[dispatch])
  const onToggleTodo = useCallback((id:number) => dispatch(toggleTodo(id)),[dispatch])
  const onRemoveTodo = useCallback((id: number) => dispatch(removeTodo(id)), [dispatch])

  return{
    todos,
    onAddTodo,
    onToggleTodo,
    onRemoveTodo
  }
}
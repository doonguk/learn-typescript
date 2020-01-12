import React from 'react';
import './TodoItem.css';
import { Todo, useTodosDisaptch } from "../contexts/TodoContexts"

export type TodoItemProps = {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useTodosDisaptch()
  const onRemove = () => {
    dispatch({
      type : "REMOVE",
      id : todo.id
    })
  }
  const onToggle = () => {
    dispatch({
      type: "TOGGLE",
      id : todo.id
    })
  }

  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
      <span className="text" onClick={onToggle}>{todo.text}</span>
      <span className="remove" onClick={onRemove}>(X)</span>
    </li>
  );
}

export default TodoItem;
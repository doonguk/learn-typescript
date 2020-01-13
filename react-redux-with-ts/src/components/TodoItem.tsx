import React from 'react';
import './TodoItem.css';
import { Todo } from '../modules/todos';
import useTodos from "../hooks/useTodos"

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  const {onRemoveTodo, onToggleTodo} = useTodos()
  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
      <span className="text" onClick={()=>onToggleTodo(todo.id)}>{todo.text}</span>
      <span className="remove" onClick={()=>onRemoveTodo(todo.id)}>(X)</span>
    </li>
  );
}

export default TodoItem;
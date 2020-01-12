import React, {useState} from 'react'
import {useTodosDisaptch} from "../contexts/TodoContexts"

function TodoForm(){
  const [value, setValue] = useState('')
  const dispatch = useTodosDisaptch()
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({
      type : "CREATE",
      text : value
    })
    setValue('')
  }
  return(
    <form onSubmit={onSubmit}>
      <input
        value={value}
        placeholder="무엇을 하실 건가요?"
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">등록</button>
    </form>
  )
}

export default TodoForm
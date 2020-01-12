import React, {useState} from 'react'

function TodoForm(){
  const [value, setValue] = useState('')
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
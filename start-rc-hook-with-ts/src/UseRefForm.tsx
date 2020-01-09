import React, {useState, useRef} from 'react'

type MyFormProps = {
  onSubmit: (form: { name: string, description: string }) => void
}

type form = {
  name: string
  description: string
}

export default function UseRefForm({onSubmit}: MyFormProps) {
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
    if(!ref.current) return
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

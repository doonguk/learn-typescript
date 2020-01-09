import React, {useState} from 'react'

type MyFormProps = {
    onSubmit: (form: { name: string, description: string }) => void
}

type form = {
    name: string
    description: string
}

export default function MyForm({onSubmit}: MyFormProps) {
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={name} onChange={handleChange}/>
            <input type="text" name="description" value={description} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}

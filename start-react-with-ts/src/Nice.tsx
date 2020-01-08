import React from 'react'

type niceProps = {
    name: string
    say: string
    options?: string
    func: (name: string) => void
}

const Nice = ({name, say, options, func}: niceProps) => {
    return(
        <>
            <div>Hello My Name is {name}! {say}</div>
            {options && <div>Here is {options}</div>}
            <button onClick={()=>func(name)}>Click</button>
        </>
    )
}

Nice.defaultProps = {
    name : 'donguk',
    say : 'thx thx',
}

export default Nice
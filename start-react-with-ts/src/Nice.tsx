import React from 'react'

type niceProps = {
    name: string
    say: string
}

const Nice = ({name, say}: niceProps) => {
    return(
        <div>Hello My Name is {name}! {say}</div>
    )
}

Nice.defaultProps = {
    name : 'donguk',
    say : 'thx thx'
}

export default Nice
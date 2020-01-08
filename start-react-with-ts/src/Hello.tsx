import React from 'react'

type helloProps = {
    name: string
    say: string
}

const Hello: React.FC<helloProps> = ({name, say}) => {
 return(
        <div>Hello My Name is {name}! {say}</div>
    )
}

// Hello.defaultProps = {
//     say : 'thank you'
// } Error!

export default Hello
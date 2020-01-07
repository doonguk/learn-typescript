interface Person {
    name: string
    age?: number
}

interface Developer extends Person{
    skills: string[]
}

const donguk: Person = {
    name :'donguk',
    age : 27
}

const velopert: Developer = {
    name : 'velopert',
    age : 30,
    skills : ['React', 'Javascript']
}


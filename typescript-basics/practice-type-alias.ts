type Person2 = {
    name: string
    age?: number
}

type Developer2 = Person2 & {
    skills: string[]
}

const person: Person2 = {
    name: '배민',
}

const developer: Developer2 = {
    name: '김배민',
    skills: ['react', 'js']
}

type People = Person2[]
const people: People = [person, developer]

type Color = 'yellow' | 'red' | 'orange'
const c: Color = 'yellow'

const colors: Color[] = ['red', 'orange']


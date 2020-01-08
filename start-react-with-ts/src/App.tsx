import React from 'react';
import Hello from "./Hello";
import Nice from './Nice'

const App: React.FC = () => {
    const handleClick = (name: string) => {
        console.log('name name', name)
    }
    return (
        <>
            <Hello name="donguk" say="thank you"/>
            <Nice func={handleClick}/>
        </>
    );
}

export default App;

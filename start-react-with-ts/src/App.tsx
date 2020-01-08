import React from 'react';
import Hello from "./Hello";
import Nice from './Nice'

const App: React.FC = () => {
    return (
        <>
            <Hello name="donguk" say="thank you"/>
            <Nice/>
        </>
    );
}

export default App;

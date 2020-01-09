import React from 'react';
import Counter from "./Counter";
import MyForm from "./MyForm"
import ReducerCounter from "./ReducerCounter"
import ReducerSample from "./ReducerSample"
import UseRefForm from "./UseRefForm"

const App: React.FC = () => {
  const handleSubmit = (form : {name: string, description: string}): void => {
    console.log(form)
  }
  return (
    <div className="App">
      <Counter/>
      <MyForm onSubmit={handleSubmit}/>
      <ReducerCounter/>
      <ReducerSample/>
      <UseRefForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default App;

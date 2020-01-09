import React, {useReducer} from 'react'

type Action = {type:'INCREASE'} | {type:'DECREASE'} // | 를 이용하여 액션을 나열하자.
function reducer(state: number, action: Action): number{
  switch (action.type) {
    case 'INCREASE':
      return state +1
    case 'DECREASE':
      return state-1
    default:
      throw new Error('Unhandled Action')
  }
}

export default function ReducerCounter(){
  const [count, dispatch] = useReducer(reducer, 0)
  const onIncrease = () => dispatch({type : 'INCREASE'})
  const onDecrease = () => dispatch({type : 'DECREASE'})
  return(
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  )
}
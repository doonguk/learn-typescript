export {}
const INCREASE = 'counter/INCREASE' as const
const DECREASE = 'counter/DECREASE' as const
const INCREASE_BY = 'counter/INCREASE_BY' as const

export const increase = () => ({type : INCREASE})
export const decrease = () => ({type : DECREASE})
export const increaseBy = (diff: number) => ({type : INCREASE_BY, payload : diff})

type CounterAction =
  | ReturnType<typeof increase> // const assertion 해서 string 아님
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy> // ReturnType 은 함수에서 반환하는 타입을 타입으로 지정.

type CounterState = {
  count : number
}

const initialState: CounterState = {
  count : 0
}

export default function(state: CounterState = initialState, action: CounterAction){
  switch (action.type) {
    case INCREASE : {
      return { count : state.count + 1 } // new State return
    }
    case DECREASE : {
      return { count : state.count -1}
    }
    case INCREASE_BY : {
      return { count : state.count + action.payload }
    }
    default :
      return state
  }
}
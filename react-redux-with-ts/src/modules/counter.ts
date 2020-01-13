import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_BY = 'counter/INCREASE_BY'

export const increase = createAction(INCREASE)()
export const decrease = createAction(DECREASE)()
export const increaseBy = createAction(INCREASE_BY)<number>() //FSA ?


// type CounterAction =
//   | ReturnType<typeof increase> // const assertion 해서 string 아님
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy> // ReturnType 은 함수에서 반환하는 타입을 타입으로 지정.

const actions = { increaseBy, increase, decrease }
type CounterAction = ActionType<typeof actions>

type CounterState = {
  count : number
}
const initialState: CounterState = {
  count : 0
}

// export default function(state: CounterState = initialState, action: CounterAction){
//   switch (action.type) {
//     case INCREASE : {
//       return { count : state.count + 1 } // new State return
//     }
//     case DECREASE : {
//       return { count : state.count -1}
//     }
//     case INCREASE_BY : {
//       return { count : state.count + action.payload }
//     }
//     default :
//       return state
//   }
// }

export default createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE] : state => ({count : state.count+1}),
  [DECREASE] : state => ({count : state.count-1}),
  [INCREASE_BY] : (state, action) => ({count : state.count + action.payload})
})
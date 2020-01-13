import { combineReducers } from "redux"
import counter from "./counter"
import todos from "./todos"

const rootReducer = combineReducers({
  counter,
  todos
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer> // 함수가 반환하는 값의 타입을 타입으로 지정.
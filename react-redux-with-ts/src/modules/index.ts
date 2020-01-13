import { combineReducers } from "redux"
import counter from "./counter"

const rootReducer = combineReducers({
  counter
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer> // 함수가 반환하는 값의 타입을 타입으로 지정.
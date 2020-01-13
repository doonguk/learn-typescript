import {useSelector, useDispatch} from "react-redux"
import {useCallback } from 'react'
import {RootState} from "../modules"
import {increase, decrease, increaseBy} from "../modules/counter"

export default function useCounter(){
  const dispatch = useDispatch()
  const {count} = useSelector((state: RootState) => state.counter)
  const onIncrease = useCallback(()=>{
    dispatch(increase())
  },[dispatch])
  const onDecrease = useCallback(()=>{
    dispatch(decrease())
  },[dispatch])
  const onIncreaseBy = useCallback((diff: number)=>{
    dispatch(increaseBy(diff))
  },[dispatch])

  return{
    count,
    onDecrease,
    onIncrease,
    onIncreaseBy
  }
}
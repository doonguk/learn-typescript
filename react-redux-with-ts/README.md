> # TypeScript Redux 프로젝트에 적용하기



### 1.  Install Package

```bash
$ yarn add redux react-redux @types/react-redux
```

- `@types` 는 타입스크립트 미지원 라이브러리에 타입스크립트를 지원을 받을 수 있게 해주는 3rd Party 라이브러리다.

- 어떤 라이브러리가 타입스크립트를 지원하는지 알고 싶다면 프로젝트에  `index.d.ts` 파일이 존재하는지 확인하면 된다.



### 2.  Action

#### src/modules/counter.ts

```javascript
const INCREASE = 'counter/INCREASE' as const
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;
```

`as const`는 `type assertion` 이라는 문법이다. 이 문법은 지정받은 값의 타입이 `string`이 되지않고 실제 값을 가르키게 된다. ( 여기서 실제 값이란 `counter/INCREASE`)

###3.  Action Creator

```javascript
const increase = () => ({type : INCREASE})
const decrease = () => ({type : DECREASE})
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff
});
```

`diff`로 값을 받아서 `payload` 의 값으로 설정 한 이유는 `FSA 규칙`을 따르기 위함. ( [링크](https://github.com/redux-utilities/flux-standard-action) )



### 4. Reducer 작성을 위한 Action 객체 타입 지정

```javascript
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;  
```

- `ReturnType`은 함수에서 반환하는 타입을 타입으로 지정할 때 사용한다.  

- `Action`을 생성할 때 사용한 `as const`에 의해 `Action` 객체 들의 타입이 `string`이 되지 않고 return 된 값 자체가 된다.



### 5.  reducer state 의 초기값 설정

```javascript
type CounterState = {
  count: number
}
const initialState: CounterState = {
  count : 0
}
```



### 6. reducer

```javascript
export default function(state: CounterState = initialState, action: CounterAction){
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}
```



### 7. Redux 적용

#### src/modules/index.ts

```javascript
const { combineReducers } from 'redux'
const counter from './counter'

const rootReducer = combineRedcuers({
  conter
})

export default rootReducer
export type rootState = ReturnType<typeof rootReducer>
```

기존 리덕스와 다른점은 `rootState` 타입을 지정했다는 것인데, 후에 컴포넌트에서 `useSelector`를 이용하여 `state`를 조회할 때 필요하다.



### 8. Custom hook 작성



#### src/hooks/useCounter.tsx

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { increase, decrease, increaseBy } from '../modules/counter';
import { useCallback } from 'react';

export default function useCounter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onIncreaseBy = useCallback(
    (diff: number) => dispatch(increaseBy(diff)),
    [dispatch]
  );

  return {
    count,
    onIncrease,
    onDecrease,
    onIncreaseBy
  };
}
```

- `useSelector`를 이용해 `store`내부 값을 조회 할 때 타입으로 `RootState`를 지정해 줬다.

- `useCounter` 라는 Custom Hook을 만들어 hook의 재사용성을 높여줬다.



#### src/components/Counter.tsx

```javascript
import React from 'react';
import useCounter from '../hooks/useCounter';

function Counter() {
  const { count, onIncrease, onDecrease, onIncreaseBy } = useCounter();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
```

Hook을 사용할 컴포넌트 에서는 작성한 Custom Hook을 `import` 하여 사용한다.



> # typesafe-actions로 redux 모듈 리팩토링



### 1. 필요한 모듈 import

#### src/modules/counter.ts

```javascript
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';
```



### 2. as const 지우기

```javascript
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';
```



### 3. createAction으로 액션 생성함수 만들기

```javascript
export const increase = createAction(INCREASE)()
export const decrease = createAction(DECREASE)()
export const increaseBy = createAction(increaseBy)<number>()
```



### 4. 액션의 객체 타입 만들기

```javascript
const actions = {increase, decrease, increaseBy}
type CounterAction = ActionType<typeof actions>
```



### 5. createReducer로 리듀서 만들기

```javascript
export default counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: state => ({ count: state.count + 1 }),
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
})
```


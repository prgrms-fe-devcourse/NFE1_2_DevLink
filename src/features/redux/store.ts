import { configureStore, combineReducers } from "@reduxjs/toolkit";

import counterReducer from "../counter/counterSlice";

// 초기 상태 정의
const initialState = {
  isLogin: false,
};

// 액션 타입 정의
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// 사용자 리듀서 함수 정의
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

// 리듀서 결합
const rootReducer = combineReducers({
  counter: counterReducer,
  // 사용자 리듀서 추가
  user: userReducer,
});

// 스토어 생성
const store = configureStore({
  reducer: rootReducer,
});

export default store;

import { useContext } from "react";

import { PostContext } from "../features/post-management/PostContext";

/**
 * 커스텀 훅 `usePost`는 PostContext에 접근할 수 있도록 해줍니다.
 *
 * 해당 훅을 사용하여 포스트 관리와 관련된 현재 상태 및 액션 디스패치를 사용할 수 있습니다.
 *
 * @function
 * @returns {Object} - 현재 포스트 상태와 디스패치 함수를 포함한 객체를 반환합니다.
 *
 * @throws {Error} - PostProvider 외부에서 이 훅을 사용하면 에러가 발생합니다.
 *
 * @example
 * // PostProvider 내부에서 사용되는 컴포넌트에서
 * const { state, dispatch } = usePost();
 *
 * // 포스트 데이터에 접근
 * console.log(state.title);
 *
 * // 액션 디스패치
 * dispatch({ type: 'SET_TITLE', payload: '새 제목' });
 *
 * @see PostProvider - 이 훅을 사용하는 컴포넌트는 반드시 PostProvider로 감싸져야 합니다.
 */
export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used within a PostProvider.");
  }

  return context;
};

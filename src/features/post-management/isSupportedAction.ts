import { PostActionType } from "./type";

type ExcludeActionType = PostActionType.SET_ALL | PostActionType.RESET | PostActionType.SET_STATUS;

// 헬퍼 함수
export const isSupportedPostAction = (
  type: PostActionType
): type is Exclude<PostActionType, ExcludeActionType> => {
  return (
    type !== PostActionType.SET_ALL &&
    type !== PostActionType.RESET &&
    type !== PostActionType.SET_STATUS
  );
};

import { PostActionType } from "./type";

// 헬퍼 함수
export const isSupportedPostAction = (
  type: PostActionType
): type is Exclude<PostActionType, PostActionType.SET_ALL | PostActionType.RESET> => {
  return type !== PostActionType.SET_ALL && type !== PostActionType.RESET;
};

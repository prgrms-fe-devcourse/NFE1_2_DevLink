import { createContext, PropsWithChildren, useReducer } from "react";

import { PostAction, PostActionType, PostContextProps, PostState } from "./type";
import { initialState } from "./config";

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionType.SET_TITLE:
      return { ...state, title: action.payload };
    case PostActionType.SET_CODE:
      return { ...state, code: action.payload };
    case PostActionType.SET_BODY:
      return { ...state, body: action.payload };
    case PostActionType.SET_SUMMARY:
      return { ...state, summary: action.payload };
    case PostActionType.SET_ALL:
      return { ...action.payload };
    case PostActionType.RESET:
      return initialState;
    default:
      throw new Error("Unhandled action type");
  }
};

export const PostContext = createContext<PostContextProps>(null);

export const PostProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return <PostContext.Provider value={{ state, dispatch }}>{children}</PostContext.Provider>;
};

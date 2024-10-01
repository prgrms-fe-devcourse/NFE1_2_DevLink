import { createContext, PropsWithChildren, useReducer } from "react";

import {
  PostAction,
  PostActionType,
  PostContextProps,
  PostPayload,
  PostState,
  PostStatus,
} from "./type";
import { initialPostPayload, initialPostState } from "./config";

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionType.SET_TITLE:
      return setTitle(state, action.payload);
    case PostActionType.SET_CODE:
      return setCode(state, action.payload);
    case PostActionType.SET_BODY:
      return setBody(state, action.payload);
    case PostActionType.SET_SUMMARY:
      return setSummary(state, action.payload);
    case PostActionType.SET_ALL:
      return setAll(state, action.payload);
    case PostActionType.SET_STATUS:
      return setStatus(state, action.payload);
    case PostActionType.RESET:
      return setReset(state);
    default:
      throw new Error("Unhandled action type");
  }
};

const setTitle = (state: PostState, title: string): PostState => ({
  ...state,
  payload: { ...state.payload, title },
});

const setCode = (state: PostState, code: string): PostState => ({
  ...state,
  payload: { ...state.payload, code },
});

const setBody = (state: PostState, body: string): PostState => ({
  ...state,
  payload: { ...state.payload, body },
});

const setSummary = (state: PostState, summary: string): PostState => ({
  ...state,
  payload: { ...state.payload, summary },
});

const setAll = (state: PostState, all: PostPayload): PostState => ({
  ...state,
  payload: { ...all },
});

const setStatus = (state: PostState, status: PostStatus): PostState => ({
  status,
  payload: { ...state.payload },
});

const setReset = (state: PostState): PostState => ({
  ...state,
  payload: initialPostPayload,
});

export const PostContext = createContext<PostContextProps>(null);

export const PostProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialPostState);

  return <PostContext.Provider value={{ state, dispatch }}>{children}</PostContext.Provider>;
};

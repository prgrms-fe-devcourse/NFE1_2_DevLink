import { createContext, PropsWithChildren, useReducer } from "react";
import { PostAction, PostContextProps, PostState } from "./type";

const initialState: PostState = {
  title: "",
  code: "",
  body: "",
  summary: "",
};

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CODE":
      return { ...state, code: action.payload };
    case "SET_BODY":
      return { ...state, body: action.payload };
    case "SET_SUMMARY":
      return { ...state, summary: action.payload };
    case "SET_ALL":
      return { ...action.payload };
    case "RESET":
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

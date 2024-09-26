export type PostState = {
  title: string;
  code: string;
  body: string;
  summary: string;
};

export type PostAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CODE"; payload: string }
  | { type: "SET_BODY"; payload: string }
  | { type: "SET_SUMMARY"; payload: string }
  | { type: "SET_ALL"; payload: PostState }
  | { type: "RESET" };

export type PostContextProps = {
  state: PostState;
  dispatch: React.Dispatch<PostAction>;
} | null;

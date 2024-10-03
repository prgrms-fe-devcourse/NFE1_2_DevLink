export type PostPayload = {
  title: string;
  code: string;
  body: string;
  summary: string;
};

export type PostStatus = "create" | "preview" | "modify";

export type PostState = {
  payload: PostPayload;
  status: PostStatus;
};

export enum PostActionType {
  SET_TITLE = "SET_TITLE",
  SET_CODE = "SET_CODE",
  SET_BODY = "SET_BODY",
  SET_SUMMARY = "SET_SUMMARY",
  SET_ALL = "SET_ALL",
  SET_STATUS = "SET_STATUS",
  RESET = "RESET",
}

export type PostAction =
  | { type: PostActionType.SET_TITLE; payload: string }
  | { type: PostActionType.SET_CODE; payload: string }
  | { type: PostActionType.SET_BODY; payload: string }
  | { type: PostActionType.SET_SUMMARY; payload: string }
  | { type: PostActionType.SET_ALL; payload: PostPayload }
  | { type: PostActionType.SET_STATUS; payload: PostStatus }
  | { type: PostActionType.RESET };

export type PostContextProps = {
  state: PostState;
  dispatch: React.Dispatch<PostAction>;
} | null;

export type PostFormHandler = (
  type: PostActionType
) => <T extends HTMLElement>(e: React.ChangeEvent<T>) => void;

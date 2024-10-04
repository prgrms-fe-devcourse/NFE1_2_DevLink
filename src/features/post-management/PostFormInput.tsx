import React from "react";

import { BodyTextInput, CodeInput, SummaryInput, TitleInput } from "../../components/post";
import { hasValueProperty } from "../../utils/hasValueProperty";
import { isSupportedPostAction } from "./isSupportedAction";
import { PostActionType, PostContextProps, PostFormHandler } from "./type";

interface PostFormMainProps {
  context: PostContextProps;
}

const PostFormInput: React.FC<PostFormMainProps> = ({ context }) => {
  if (!context) {
    throw new Error("A valid context must exist");
  }

  const {
    dispatch,
    state: { payload },
  } = context;

  // 사용자 입력 이벤트 처리
  const handleChange: PostFormHandler = (type) => (e) => {
    const { target } = e;

    if (!isSupportedPostAction(type)) {
      throw new Error(`${type} cannot be handled by handleChange.`);
    }

    if (!hasValueProperty<HTMLInputElement | HTMLTextAreaElement>(target)) {
      throw new ReferenceError("Value attribute is missing.");
    }

    dispatch({ type, payload: target.value });
  };

  const handleCodeChange = (type: PostActionType) => (code?: string) => {
    if (type === PostActionType.SET_CODE && code !== undefined) {
      dispatch({ type, payload: code });
    }
  };

  return (
    <>
      <TitleInput onChange={handleChange(PostActionType.SET_TITLE)} value={payload.title} />
      <CodeInput onChange={handleCodeChange(PostActionType.SET_CODE)} value={payload.code} />
      <BodyTextInput onChange={handleChange(PostActionType.SET_BODY)} value={payload.body} />
      <SummaryInput onChange={handleChange(PostActionType.SET_SUMMARY)} value={payload.summary} />
    </>
  );
};

export default PostFormInput;

import { BodyTextInput, CodeInput, SummaryInput, TitleInput } from "../../components/post";
import { hasValueProperty } from "../../utils/hasValueProperty";
import { isSupportedPostAction } from "./isSupportedAction";
import { PostAction, PostActionType, PostFormHandler, PostPayload } from "./type";
import React from "react";

interface PostFormMainProps {
  data: PostPayload;
  dispatch: React.Dispatch<PostAction>;
}

const PostFormInput: React.FC<PostFormMainProps> = ({ data, dispatch }) => {
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
      <TitleInput onChange={handleChange(PostActionType.SET_TITLE)} value={data.title} />
      <CodeInput onChange={handleCodeChange(PostActionType.SET_CODE)} value={data.code} />
      <BodyTextInput onChange={handleChange(PostActionType.SET_BODY)} value={data.body} />
      <SummaryInput onChange={handleChange(PostActionType.SET_SUMMARY)} value={data.summary} />
    </>
  );
};

export default PostFormInput;

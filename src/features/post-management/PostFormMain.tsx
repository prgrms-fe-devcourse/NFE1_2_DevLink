import styled from "styled-components";

import { BodyTextInput, CodeInput, SummaryInput, TitleInput } from "../../components/post";
import { usePost } from "../../hooks/usePost";
import { hasValueProperty } from "../../utils/hasValueProperty";
import { isSupportedPostAction } from "./isSupportedAction";
import { PostActionType, PostFormHandler } from "./type";
import { config } from "./config";

const PostFormMain = () => {
  const { dispatch, state } = usePost();

  // 사용자 입력 이벤트 처리
  const handleChange: PostFormHandler = (type) => (e) => {
    const { target } = e;

    if (!isSupportedPostAction(type)) {
      throw new Error("SET_ALL or RESET cannot be handled by handleChange.");
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
    <OuterContainer>
      <InnerContainer>
        <TitleInput onChange={handleChange(PostActionType.SET_TITLE)} value={state.title} />
        <CodeInput onChange={handleCodeChange(PostActionType.SET_CODE)} value={state.code} />
        <BodyTextInput onChange={handleChange(PostActionType.SET_BODY)} value={state.body} />
        <SummaryInput onChange={handleChange(PostActionType.SET_SUMMARY)} value={state.summary} />
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${style.container.width}px;
  padding: 0 40px;
  background: ${style.background};

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export default PostFormMain;

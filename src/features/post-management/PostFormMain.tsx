import styled from "styled-components";

import { BodyTextInput, CodeInput, SummaryInput, TitleInput } from "../../components/post";
import { usePost } from "../../hooks/usePost";
import { hasValueProperty } from "../../utils/hasValueProperty";
import { isSupportedPostAction } from "./isSupportedAction";
import { PostActionType, PostFormHandler } from "./type";
import { config } from "./config";

/**
 * 제목
 * 코드 입력
 * 본문 텍스트
 * 한줄 요약
 *
 */
const PostFormMain = () => {
  const { dispatch } = usePost();

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

  return (
    <OuterContainer>
      <InnerContainer>
        <TitleInput onChange={handleChange(PostActionType.SET_TITLE)} />
        <CodeInput onChange={handleChange(PostActionType.SET_CODE)} />
        <BodyTextInput onChange={handleChange(PostActionType.SET_BODY)} />
        <SummaryInput onChange={handleChange(PostActionType.SET_SUMMARY)} />
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  background: blue;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${style.container.width}px;
  background: pink;
`;

export default PostFormMain;

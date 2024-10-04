import { Button } from "antd";
import styled from "styled-components";

import { config } from "./config";
import { usePost } from "../../hooks/usePost";
import { PostActionType } from "./type";
import { toggleState } from "../../utils/toggleState";

const PostFormHeader = () => {
  const {
    dispatch,
    state: { status },
  } = usePost();

  const onClickStatusHandler = () => {
    dispatch({
      type: PostActionType.SET_STATUS,
      payload: toggleState(status, "create", "preview"),
    });
  };

  const label = status === "create" ? "포스트 미리보기" : "미리보기 종료";

  return (
    <OuterContainer>
      <InnerContainer>
        <Button onClick={onClickStatusHandler}>{label}</Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${style.top.height}px;
  /* background: green; */
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  width: ${style.container.width}px;
  padding: 40px;
  border-radius: 6px 6px 0 0;
  background: ${style.background};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default PostFormHeader;

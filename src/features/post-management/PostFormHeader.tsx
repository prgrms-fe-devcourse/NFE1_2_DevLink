import { Button } from "antd";
import styled from "styled-components";

import { config } from "./config";
import { usePost } from "../../hooks/usePost";
import { PostActionType, PostStatus } from "./type";
import { useEffect, useRef } from "react";

const label: Record<PostStatus, string> = {
  create: "포스트 미리보기",
  modify: "포스트 미리보기",
  preview: "미리보기 종료",
};

const PostFormHeader = () => {
  const {
    dispatch,
    state: { status },
  } = usePost();
  const prevArrStatusRef = useRef<PostStatus[]>([]);

  const prevArrLength = prevArrStatusRef.current.length;
  const lastElement = prevArrLength > 0 ? prevArrStatusRef.current[prevArrLength - 1] : status;

  useEffect(() => {
    prevArrStatusRef.current.push(status);

    return () => {
      prevArrStatusRef.current = [];
    };
  }, [status]);

  const onClickStatusHandler = () => {
    dispatch({
      type: PostActionType.SET_STATUS,
      payload: status === "preview" ? lastElement : "preview",
    });
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Button onClick={onClickStatusHandler}> {label[status]}</Button>
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

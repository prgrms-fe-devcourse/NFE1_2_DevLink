import { Button } from "antd";
import styled from "styled-components";

import { usePost } from "../../hooks/usePost";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostActionType, PostState } from "./type";
import { config, initialState } from "./config";
import { useEffect } from "react";

const PostFormFooter = () => {
  const { state, dispatch } = usePost();
  const [storedValue, setValue] = useLocalStorage<PostState>("post-form", initialState);

  const isSaved = Object.values(storedValue).some((value) => value !== "");

  useEffect(() => {
    if (isSaved) {
      dispatch({ type: PostActionType.SET_ALL, payload: storedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OuterContainer>
      <InnerContainer>
        <Button
          onClick={() => {
            console.log(state);
            setValue(state);
          }}>
          임시 저장
        </Button>
        <Button
          type="primary"
          onClick={() => {
            console.log(state);
            setValue(initialState);
          }}>
          포스트 생성
        </Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.footer`
  display: flex;
  height: ${style.bottom.height}px;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 100px;
  align-items: center;
  justify-content: center;
  width: ${style.container.width}px;
  border-radius: 0 0 6px 6px;
  background: ${style.background};
`;

export default PostFormFooter;

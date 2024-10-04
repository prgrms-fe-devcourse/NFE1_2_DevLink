import { Button } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";

import { usePost } from "../../hooks/usePost";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostActionType, PostPayload } from "./type";
import { config, initialPostPayload } from "./config";

const PostFormFooter = () => {
  const { state, dispatch } = usePost();
  const [storedValue, setValue] = useLocalStorage<PostPayload>("post-form", initialPostPayload);

  const isSaved = Object.values(storedValue).some((value) => value !== "");

  useEffect(() => {
    if (isSaved) {
      dispatch({ type: PostActionType.SET_ALL, payload: storedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <OuterContainer>
      <InnerContainer>
        <TemporaryStorageButton onClick={() => setValue(state.payload)} />
        <Button
          type="primary"
          onClick={() => {
            console.log(state);
            setValue(initialPostPayload);
          }}>
          포스트 생성
        </Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const TemporaryStorageButton = ({ onClick }: { onClick: () => void }) => {
  const [clickStatus, setClickStatus] = useState(false);

  const label = {
    default: "저장 하기",
    success: "저장 완료",
  };
  const buttonText = clickStatus ? label.success : label.default;

  const onClickHandler = () => {
    const ms = 1500;

    setClickStatus(true);
    onClick();
    setTimeout(() => {
      setClickStatus(false);
    }, ms);
  };

  return (
    <Button onClick={onClickHandler} icon={<SaveOutlined />}>
      {buttonText}
    </Button>
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

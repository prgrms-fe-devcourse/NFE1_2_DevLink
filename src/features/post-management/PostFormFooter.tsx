import { Button } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";

import { usePost } from "../../hooks/usePost";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostActionType, PostPayload, PostStatus } from "./type";
import { config, initialPostPayload } from "./config";

const label: Record<PostStatus, string> = {
  create: "포스트 생성",
  modify: "포스트 수정",
  preview: "포스트 작업",
};

const initPostPayload: PostPayload = {
  title: "",
  code: "",
  body: "",
  summary: "",
};

const PostFormFooter = () => {
  const { state, dispatch } = usePost();
  const [storedValue, setValue] = useLocalStorage<PostPayload>("post-form", initPostPayload);

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
        <TemporaryStorageButton
          onClick={() => setValue(state.payload)}
          disabled={state.status === "modify" || state.status === "preview"}
        />
        <Button
          type="primary"
          disabled={state.status === "preview"}
          onClick={() => {
            console.log(state.payload);
            setValue(initialPostPayload);
          }}>
          {label[state.status]}
        </Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const TemporaryStorageButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  const [clickStatus, setClickStatus] = useState(false);

  const label = {
    default: "임시 저장",
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
    <Button onClick={onClickHandler} icon={<SaveOutlined />} disabled={disabled}>
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

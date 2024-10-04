import { Button } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { usePost } from "../../hooks/usePost";
import useLocalStorage, { LocalStorage } from "../../hooks/useLocalStorage";
import { PostActionType, PostPayload, PostStatus } from "./type";
import { CHANNEL_ID, config, initialPostPayload, SERVER_URL } from "./config";

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

const localStorage = new LocalStorage();

const requestCreatePost = async (payload: PostPayload, channelId: string, jwtToken: string) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", JSON.stringify(payload));
    formData.append("channelId", channelId);

    // fetch 요청
    const response = await fetch(`${SERVER_URL}/posts/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 설정
      },
      body: formData, // FormData 객체 전송
    });

    // 응답 처리2
    if (!response.ok) {
      throw new Error("Failed to create a post");
    }

    const result = await response.json();
    console.log("Successful post creation:", result);
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const PostFormFooter = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePost();
  const [storedValue, setValue] = useLocalStorage<PostPayload>("post-form", initPostPayload);

  const isSaved = Object.values(storedValue).some((value) => value !== "");

  const onSubmitHandler = () => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      requestCreatePost(state.payload, CHANNEL_ID, userToken);
      setValue(initialPostPayload);
      navigate("/");
    }
  };

  useEffect(() => {
    if (isSaved) {
      dispatch({ type: PostActionType.SET_ALL, payload: storedValue });
    }

    console.log(localStorage.getItem("userToken"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OuterContainer>
      <InnerContainer>
        <TemporaryStorageButton
          onClick={() => setValue(state.payload)}
          disabled={state.status === "modify" || state.status === "preview"}
        />
        <Button type="primary" disabled={state.status === "preview"} onClick={onSubmitHandler}>
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

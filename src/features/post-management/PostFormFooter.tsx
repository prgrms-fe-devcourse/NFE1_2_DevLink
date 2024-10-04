import { Button, message } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../../hooks/usePost";
import useLocalStorage, { LocalStorage } from "../../hooks/useLocalStorage";
import { PostActionType, PostPayload, PostStatus } from "./type";
import { CHANNEL_ID, config, initialPostPayload, SERVER_URL } from "./config";
import { sendPostRequest } from "./api";

const label: Record<PostStatus, string> = {
  create: "포스트 생성",
  modify: "포스트 수정",
  preview: "포스트 작업",
};

const localStorage = new LocalStorage();

const PostFormFooter = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = usePost();
  const [storedValue, setValue] = useLocalStorage<PostPayload>("post-form", initialPostPayload);

  const userToken = localStorage.getItem("userToken");
  const isSaved = Object.values(storedValue).some((value) => value !== "");

  const handler: Record<PostStatus, () => void> = {
    async create() {
      if (userToken) {
        const userId = await sendPostRequest({
          url: `${SERVER_URL}/posts/create`,
          method: "POST",
          jwtToken: userToken,
          payload: state.payload,
          additionalData: {
            channelId: CHANNEL_ID,
          },
        });

        if (!userId) {
          message.error("Error occurred: Failed to read userId");
          return;
        }

        setValue(initialPostPayload);
        navigate(`/profile/${userId}`, { replace: true });
      }
    },
    async modify() {
      if (userToken && postId) {
        const userId = await sendPostRequest({
          url: `${SERVER_URL}/posts/update`,
          method: "PUT",
          jwtToken: userToken,
          payload: state.payload,
          additionalData: {
            postId,
            channelId: CHANNEL_ID,
          },
        });

        if (!userId) {
          message.error("Error occurred: Failed to read userId");
          return;
        }

        setValue(initialPostPayload);
        navigate(`/profile/${userId}`, { replace: true });
      }
    },
    preview() {},
  };

  useEffect(() => {
    if (isSaved) {
      dispatch({ type: PostActionType.SET_ALL, payload: storedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={handler[state.status]}>
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

  const buttonText = clickStatus ? "저장 완료" : "임시 저장";
  const onClickHandler = () => {
    setClickStatus(true);
    onClick();
    setTimeout(() => setClickStatus(false), 1500);
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

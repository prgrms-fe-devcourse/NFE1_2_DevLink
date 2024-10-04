import { Button, message } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../../hooks/usePost";
import useLocalStorage, { LocalStorage } from "../../hooks/useLocalStorage";
import { PostActionType, PostPayload, PostStatus } from "./type";
import { CHANNEL_ID, config, initialPostPayload, SERVER_URL } from "./config";
import { PostRequestError, sendPostRequest } from "./api";

const label: Record<PostStatus, string> = {
  create: "포스트 생성",
  modify: "포스트 수정",
  preview: "포스트 작업",
};

const localStorage = new LocalStorage();

const PostFormFooter = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    state: { payload, status },
    dispatch,
  } = usePost();
  const [storedValue, setValue] = useLocalStorage<PostPayload>("post-form", initialPostPayload);

  const isSaved = Object.values(storedValue).some((value) => value !== "");
  const handler = handlePostActions({
    postId,
    channelId: CHANNEL_ID,
    payload,
    onError(error) {
      if (error instanceof PostRequestError) {
        message.error(error.message);
        return;
      }

      throw error;
    },
    onSuccess(userId) {
      setValue(initialPostPayload);
      navigate(`/profile/${userId}`, { replace: true });
    },
  });

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
          onClick={() => setValue(payload)}
          disabled={status === "modify" || status === "preview"}
        />
        <Button type="primary" disabled={status === "preview"} onClick={handler[status]}>
          {label[status]}
        </Button>
      </InnerContainer>
    </OuterContainer>
  );
};

type Options = {
  postId?: string;
  channelId: string;
  payload: PostPayload;
  onSuccess: (userId: string) => void;
  onError: (error: unknown) => void;
};

const handlePostActions = (options: Options) => {
  const userToken = localStorage.getItem("userToken");

  const handlePostRequest = async (
    url: string,
    method: "POST" | "PUT",
    additionalData: Record<string, string>
  ) => {
    if (userToken) {
      try {
        const userId = await sendPostRequest({
          url,
          method,
          jwtToken: userToken,
          payload: options.payload,
          additionalData,
        });

        if (!userId) {
          message.error("Error occurred: Failed to read userId");
          return;
        }

        message.success(
          method === "POST" ? "Successful post creation" : "Successful post modification"
        );

        options.onSuccess(userId);
      } catch (error) {
        options.onError(error);
      }
    }
  };

  const handler: Record<PostStatus, () => void> = {
    create() {
      handlePostRequest(`${SERVER_URL}/posts/create`, "POST", { channelId: CHANNEL_ID });
    },
    modify() {
      if (options.postId) {
        handlePostRequest(`${SERVER_URL}/posts/update`, "PUT", {
          postId: options.postId,
          channelId: CHANNEL_ID,
        });
      }
    },
    preview() {},
  };

  return handler;
};

interface TemporaryStorageButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const TemporaryStorageButton: React.FC<TemporaryStorageButtonProps> = ({ onClick, disabled }) => {
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

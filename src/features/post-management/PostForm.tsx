import { useEffect } from "react";
import { message } from "antd";
import { useQuery } from "react-query";
import styled from "styled-components";

import { usePost } from "../../hooks/usePost";
import { PostActionType } from "./type";
import PostFormHeader from "./PostFormHeader";
import PostFormMain from "./PostFormMain";
import PostFormFooter from "./PostFormFooter";
import { PostRequestError, requestPostDetail } from "./api";

import { config } from "./config";

interface PostFormProps {
  isEdit?: boolean;
  postId?: string;
}

const PostForm: React.FC<PostFormProps> = ({ isEdit, postId }) => {
  const isEditStatus = Boolean(isEdit && postId);

  const { dispatch, state } = usePost();
  const { error } = useQuery(
    ["postDetail", postId],
    () => {
      if (!postId) {
        throw new PostRequestError("The postId attribute is required in the edit state.");
      }

      return requestPostDetail(postId);
    },
    {
      enabled: isEditStatus,
      retry: false,
      onSuccess: ({ reason, payload }) => {
        if (!payload) {
          throw new PostRequestError("Error occurred: Failed to read a post");
        }
        message.success(reason);
        dispatch({
          type: PostActionType.SET_ALL,
          payload,
        });
      },
      onError: (error) => {
        if (error instanceof PostRequestError) {
          message.error(error.message);

          return;
        }

        throw error;
      },
    }
  );

  useEffect(() => {
    if (isEditStatus) {
      dispatch({ type: PostActionType.SET_STATUS, payload: "modify" });
    }
  }, [dispatch, isEditStatus]);

  if (error) {
    return (
      <ErrorContainer>
        <h1>Error!</h1>
        <h1>{"Failed to load data for editing a post."}</h1>
      </ErrorContainer>
    );
  }

  return (
    <>
      <h1>{state.status}</h1>
      <PostFormHeader />
      <PostFormMain />
      <PostFormFooter />
    </>
  );
};

const { style } = config;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${style.background};

  & > h1 {
    color: red;
  }
`;

export default PostForm;

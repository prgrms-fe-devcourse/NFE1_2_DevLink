import { useEffect } from "react";
import { message } from "antd";

import { usePost } from "../../hooks/usePost";
import { PostActionType } from "./type";
import PostFormHeader from "./PostFormHeader";
import PostFormMain from "./PostFormMain";
import PostFormFooter from "./PostFormFooter";
import { requestPostDetail } from "./api";

interface PostFormProps {
  isEdit?: boolean;
  postId?: string;
}

const PostForm: React.FC<PostFormProps> = ({ isEdit, postId }) => {
  const { dispatch, state } = usePost();

  useEffect(() => {
    if (isEdit && postId) {
      dispatch({ type: PostActionType.SET_STATUS, payload: "modify" });
      requestPostDetail(postId).then((payload) => {
        if (!payload) {
          return message.error("Error occurred: Failed to read a post");
        }

        dispatch({
          type: PostActionType.SET_ALL,
          payload,
        });
      });
    }
  }, [dispatch, isEdit, postId]);

  return (
    <>
      <h1>{state.status}</h1>
      <PostFormHeader />
      <PostFormMain />
      <PostFormFooter />
    </>
  );
};

export default PostForm;

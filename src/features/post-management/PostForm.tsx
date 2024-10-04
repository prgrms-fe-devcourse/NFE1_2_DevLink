import { useEffect } from "react";

import { usePost } from "../../hooks/usePost";
import { PostActionType } from "./type";
import PostFormHeader from "./PostFormHeader";
import PostFormMain from "./PostFormMain";
import PostFormFooter from "./PostFormFooter";

interface PostFormProps {
  isEdit?: boolean;
  postId?: string;
}

const PostForm: React.FC<PostFormProps> = ({ isEdit, postId }) => {
  const { dispatch, state } = usePost();

  useEffect(() => {
    if (isEdit && postId) {
      dispatch({ type: PostActionType.SET_STATUS, payload: "modify" });

      dispatch({
        type: PostActionType.SET_ALL,
        payload: {
          body: "새로운 데이타",
          code: "200",
          summary: "ㅁㄴㅇㄹㅁ",
          title: "ㅁㄴㅇㄹ",
        },
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

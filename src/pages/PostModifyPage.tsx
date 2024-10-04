import { useParams } from "react-router-dom";

import { PostProvider } from "../features/post-management/PostContext";
import PostForm from "../features/post-management/PostForm";
import PostLayout from "../components/post/PostLayout";

const PostModifyPage = () => {
  const { postId } = useParams();

  if (postId === "" || !postId) {
    throw new Error("The postId property does not exist.");
  }

  return (
    <PostLayout>
      <PostProvider>
        <PostForm isEdit={true} postId={postId} />
      </PostProvider>
    </PostLayout>
  );
};

export default PostModifyPage;

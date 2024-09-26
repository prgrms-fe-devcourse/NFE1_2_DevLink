import { PostProvider } from "../features/post-management/PostContext";
import PostForm from "../features/post-management/PostForm";

const PostCreatePage = () => {
  return (
    <PostProvider>
      <PostForm />
    </PostProvider>
  );
};

export default PostCreatePage;

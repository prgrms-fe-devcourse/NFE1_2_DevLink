import { PostProvider } from "../features/post-management/PostContext";
import PostForm from "../features/post-management/PostForm";
import PostLayout from "../components/post/PostLayout";

const PostCreatePage = () => {
  return (
    <PostLayout>
      <PostProvider>
        <PostForm />
      </PostProvider>
    </PostLayout>
  );
};

export default PostCreatePage;

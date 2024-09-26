import { PostForm, PostFormFooter, PostFormHeader } from "../features/post-management";
import { PostProvider } from "../features/post-management/PostContext";

const PostCreatePage = () => {
  return (
    <PostProvider>
      <PostFormHeader />
      <PostForm />
      <PostFormFooter />
    </PostProvider>
  );
};

export default PostCreatePage;

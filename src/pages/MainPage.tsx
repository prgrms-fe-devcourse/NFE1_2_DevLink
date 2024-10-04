import PostList from "../components/Post/PostList";

const MainPage = () => {
  const postId = "66fb4090efd4b211b0d0eb69";
  const channelId = "66fa639af51c4a015245396f"; // devlink 채널의 _id

  return (
    <>
      {/* <h2>Hello World, this is my first styled component!</h2> */}
      {/* <PostCard postId={postId} /> */}
      <PostList channelId={channelId} />
      {/* <PostDetailPage /> */}
    </>
  );
};
export default MainPage;

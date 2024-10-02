import PostCard from "../components/Post/PostCard";
import PostList from "../components/Post/PostList";
import PostDetailPage from "./PostDetailPage";
import Login from "../components/Post/Login";
import Comment from "../components/Post/Comment";
import { useEffect } from "react";
import LogoutButton from "../components/Post/Logout";

const MainPage = () => {
  // const channelId = "65a67d71231c3e492734777f"; //기존 채널
  const channelId = "66fa639af51c4a015245396f"; //devlink
  // const postId = "66778ce2418f192f946d0ca6"; //기존 채널
  const postId = "66fb4090efd4b211b0d0eb69"; //devlink

  return (
    <main>
      {/* <PostCard postId={postId} /> */}

      <Login />
      <LogoutButton />
      {/* <hr /> */}

      <PostList channelId={channelId} />

      {/* <PostDetailPage /> */}
    </main>
  );
};

export default MainPage;

import styled from "styled-components";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import NavigationBar from "../components/Navigation/NavigationBar";
import SearchUser from "../components/search-user/SearchUser";
import OnlineUser from "../components/online-user/OnlineUser";
import Header from "../components/header/Header";
import PostList from "../components/Post/PostList";

const MainPage = () => {
  const channelId = "66fa639af51c4a015245396f"; // devlink의 채널아이디

  return (
    <main>
      <Header></Header>
      <SearchUser></SearchUser>
      <OnlineUser></OnlineUser>
      <NavigationBar></NavigationBar>
      <PostList channelId={channelId} />
    </main>
  );
};

export default MainPage;

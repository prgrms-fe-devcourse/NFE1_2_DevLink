import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";
import { useQuery } from "react-query";

import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { decrement, increment } from "../features/counter/counterSlice";
import NavigationBar from "../components/Navigation/NavigationBar";
import SearchUser from "../components/search-user/SearchUser";
import OnlineUser from "../components/online-user/OnlineUser";
import Header from "../components/header/Header";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { value: count } = useAppSelector((state) => state.counter);

  return (
    <main>
      <Header></Header>
      <SearchUser></SearchUser>
      <OnlineUser></OnlineUser>
    </main>
  );
};

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const CountDisplay = styled(Title)`
  text-align: left;
`;

export default MainPage;

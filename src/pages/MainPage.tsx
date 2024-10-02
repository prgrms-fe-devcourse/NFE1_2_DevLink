import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { decrement, increment } from "../features/counter/counterSlice";
import NavigationBar from "../components/Navigation/NavigationBar";

// TODO: Remove this
const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/signin")}>로그인</Button>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
      <Button onClick={() => navigate("/")}>메인 페이지</Button>
      <Button onClick={() => navigate("/post/create")}>포스트 생성</Button>
      <Button onClick={() => navigate("/post/1")}>포스트 상세 (예시: postId = 1)</Button>
      <Button onClick={() => navigate("/post/modify/1")}>포스트 수정 (예시: postId = 1)</Button>
      <Button onClick={() => navigate("/profile/1")}>마이페이지 (예시: userId = 1)</Button>
      <NavigationBar />
    </div>
  );
};

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { value: count } = useAppSelector((state) => state.counter);

  return (
    <main>
      <NavigationButtons />
      <Wrapper>
        <Title>Hello World, this is my first styled component!</Title>
      </Wrapper>
      <div>
        <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <CountDisplay>{count}</CountDisplay>
      </div>
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

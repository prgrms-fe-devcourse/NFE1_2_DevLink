import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 로그인 박스 스타일 지정
const BoxStyle = styled.div`
  width: 500px;
  height: 600px;
  padding: 30px;
`;

interface UserData {
  email: string;
  password: string;
}

const LoginBox = (props: { userData: UserData }) => {
  const { userData } = props;
  const navigate = useNavigate();

  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <img src="src\assets\images\logo.png" alt="로고 이미지" />
      <form action="#" onClick={loginHandler}>
        <input
          type="email"
          name="email"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          defaultValue={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button type="submit">로그인</button>
        <div>OR</div>
        <button onClick={() => navigate("/signin/kakao")}>카카오 로그인</button>
      </form>
      <span>계정이 없으신가요?</span> <button onClick={() => navigate("/signup")}>회원 가입</button>
    </div>
  );
};

export default LoginBox;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { LOGIN } from "../features/redux/store";

//UserData 정의
interface UserData {
  email: string;
  password: string;
}

//props 정의
interface PropsData {
  userData: UserData;
}

// 스타일링 코드 시작

// 로그인 박스 스타일링
const BoxStyle = styled.div`
  width: 500px;
  height: 600px;
  background-color: #ffffff;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #efefef;

  form {
    width: 100%;
  }
`;

// 로고
const LogoStyle = styled.img`
  width: 250px;
  height: 50px;
  margin-bottom: 50px;
`;

// 입력창
const InputStyle = styled(Input)`
  padding: 15px;
`;

// 에러 메시지
const ErrorMessage = styled.div`
  color: red;
  margin: 5px 0;
  height: 37px;
  overflow: hidden;
  min-height: 20px;
  font-size: 15px;
`;

// 로그인 버튼
const LoginButton = styled(Button)`
  padding: 23px;
`;

// 회원가입 버튼
const SignUpButton = styled(Button)``;

// OR 텍스트 부분
const OrDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem;
  justify-content: center;
`;

const OrLine = styled.div`
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
`;

const OrText = styled.div`
  margin: 0 10px;
  font-weight: bold;
  font-size: small;
  color: #959595;
`;

// 카카오 로그인 버튼
const KakaoButton = styled.button`
  background-color: #fee500;
  color: #000;
  border-radius: 12px;
  padding: 10px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 2rem;

  &:hover {
    background-color: #fee50088;
  }

  // 심볼 아이콘
  &::before {
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url("src/assets/images/logo_kakao.png");
    background-size: cover;
    margin-right: 12px;
  }
`;

// 스타일링 코드 종료

const LoginBox = ({ userData }: PropsData) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 입력 값 상태관리
  const [formData, setFormData] = useState<UserData>({ ...userData });

  // 에러 메시지
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 입력값 변경시 이벤트 핸들러
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값 유효성 검증
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,16}$/;

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailMessage(" * 이메일 형식이 잘못되었거나 공백을 포함할 수 없습니다.");
      } else {
        setEmailMessage("");
      }
    }

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setPasswordMessage(
          " * 비밀번호는 영문, 특수문자, 숫자를 포함한 8~16자여야 하며, 공백을 포함할 수 없습니다."
        );
      } else {
        setPasswordMessage("");
      }
    }
  };

  // 로그인 버튼 클릭시 이벤트 핸들러
  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailMessage && !passwordMessage && formData.email && formData.password) {
      try {
        const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          // 유저 토큰 localStorage에 저장
          window.localStorage.setItem("userToken", data.token);
          console.log("로그인 성공", data);
          // isLogin : false에서 true로 변경
          dispatch({ type: LOGIN });
          navigate("/");
        } else {
          const errorData = await response.json();
          console.log("로그인 실패", errorData);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생", error);
        alert("이메일 또는 비밀번호가 잘못 되었습니다. 이메일와 비밀번호를 정확히 입력해 주세요.");
      }
    }
  };

  return (
    <BoxStyle>
      <LogoStyle src="src\assets\images\logo.png" alt="로고 이미지" onClick={() => navigate("/")} />
      <form action="#" onSubmit={loginHandler}>
        <InputStyle type="email" name="email" placeholder="Email" onChange={changeHandler} />
        <ErrorMessage>{emailMessage}</ErrorMessage>
        <InputStyle
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
        />
        <ErrorMessage>{passwordMessage}</ErrorMessage>
        <LoginButton type="primary" htmlType="submit" block>
          로그인
        </LoginButton>
        <OrDiv>
          <OrLine></OrLine>
          <OrText>OR</OrText>
          <OrLine></OrLine>
        </OrDiv>
        <KakaoButton type="button">카카오로 로그인</KakaoButton>
      </form>
      <div>
        <span style={{ color: "black" }}>계정이 없으신가요?</span>
        <SignUpButton type="link" onClick={() => navigate("/signup")}>
          회원 가입
        </SignUpButton>
      </div>{" "}
    </BoxStyle>
  );
};

export default LoginBox;

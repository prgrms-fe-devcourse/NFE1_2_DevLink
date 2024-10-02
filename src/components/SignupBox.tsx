import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../features/redux/store";

//UserData 정의
interface UserData {
  email: string;
  fullName: string;
  password: string;
}

//props 정의
interface PropsData {
  userData: UserData;
}

// styled component : Box
const BoxStyle = styled.div`
  width: 500px;
  height: 600px;
  background-color: #ffffff;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #efefef; // 확인용

  form {
    width: 100%;
  }
`;

// styled component : Logo
const LogoStyle = styled.img`
  width: 250px;
  height: 50px;
  margin-bottom: 50px;
`;

// styled component : Input
const InputStyle = styled(Input)`
  padding: 15px;
`;

// styled component : SubmitButton
const SubmitButton = styled(Button)`
  padding: 23px;
  margin-bottom: 15px;
`;

// styled component : LoginButton
const LoginButton = styled(Button)``;

// styled component : ErrorMessage
const ErrorMessage = styled.div`
  color: red;
  margin: 5px 0;
  height: 37px;
  overflow: hidden;
  min-height: 20px;
  font-size: 15px;
`;

const SignupBox = ({ userData }: PropsData) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 입력 값 상태관리
  const [formData, setFormData] = useState<UserData>({ ...userData });

  // 에러 메시지
  const [emailMessage, setEmailMessage] = useState("");
  const [fullNameMessage, setFullNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 입력값 변경 시 이벤트 핸들러
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값 유효성 검증
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNameRegex = /^[^\s]{1,8}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,16}$/;

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailMessage(" * 이메일 형식이 잘못되었거나 공백을 포함할 수 없습니다.");
      } else {
        setEmailMessage("");
      }
    }

    if (name === "fullName") {
      if (!fullNameRegex.test(value)) {
        setFullNameMessage(" * 이름은 8자 이하여야 하고, 공백을 포함할 수 없습니다.");
      } else {
        setFullNameMessage("");
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

  // 회원가입 버튼 클릭 시 이벤트 핸들러
  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !emailMessage &&
      !fullNameMessage &&
      !passwordMessage &&
      formData.email &&
      formData.fullName &&
      formData.password
    ) {
      try {
        const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("로그인 성공", data);
          dispatch({ type: LOGIN });
          navigate("/");
        } else {
          const errorData = await response.json();
          console.log("회원가입 실패", errorData);
          alert("회원가입에 실패했습니다. 이메일과 이름, 비밀번호를 정확히 입력해 주세요.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <BoxStyle>
      <LogoStyle src="src/assets/images/logo.png" alt="로고 이미지" onClick={() => navigate("/")} />
      <form action="#" onSubmit={signUpHandler}>
        <InputStyle type="email" name="email" placeholder="Email" onChange={changeHandler} />
        <ErrorMessage>{emailMessage}</ErrorMessage>
        <InputStyle type="text" name="fullName" placeholder="Full name " onChange={changeHandler} />
        <ErrorMessage>{fullNameMessage}</ErrorMessage>
        <InputStyle
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
        />
        <ErrorMessage>{passwordMessage}</ErrorMessage>
        <SubmitButton type="primary" htmlType="submit" block>
          회원 가입
        </SubmitButton>
      </form>
      <span>
        계정이 있으신가요?
        <LoginButton type="link" onClick={() => navigate("/signin")}>
          로그인
        </LoginButton>
      </span>
    </BoxStyle>
  );
};

export default SignupBox;

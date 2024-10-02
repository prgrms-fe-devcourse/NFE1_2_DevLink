import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import devlinkLogo from "../../assets/images/devlinkLogo.png";
import signoutIcon from "../../assets/icons/signoutIcon.png";
import userIcon from "../../assets/icons/userIcon.png";
import signupIcon from "../../assets/icons/signupIcon.png";
import signinIcon from "../../assets/icons/signinIcon.png";
import styled from "styled-components";

const HeaderBackground = styled.div`
  width: 100%;
  height: 60px;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  margin-left: 10px;
  width: 200px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.3s;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  min-width: 300px;
  height: 40px;
  margin: auto;
  margin-right: 10px;
  font-size: 15px;

  img {
    width: 20px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    &:hover {
      transform: scale(1.1);
      transition-duration: 0.3s;
    }
  }
  label {
    display: flex;
    flex-direction: row;
    margin-right: 20px;
    cursor: pointer;
    div {
      &:hover {
        transform: scale(1.05);
        transition-duration: 0.3s;
      }
    }
  }
`;

const Header = () => {
  // 더미 데이터 : 삭제 예정 (테스트 전용 변수)
  const [islogin, setIslogin] = useState(true);
  const [username, setUsername] = useState("유저이름(수정필요)"); // user.fullName으로 변경 요망
  const [localStorageToken, SetLocalStorageToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZmEwODNlZGNkM2Y1NzM1M2EyYTExZiIsImVtYWlsIjoiYWFhQG5hdmVyLmNvbSJ9LCJpYXQiOjE3Mjc4MzcwMzF9.adV1I6cBqAIknVEyb08hDvSasDVcEPPdfp84qr4vNJ0"
  );
  // ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️

  // 상단 내비게이션 : 클릭 시 해당 주소로 이동
  const navigate = useNavigate();

  // 로그아웃 버튼 클릭 시 로그아웃 API 요청 - 수정 중
  const onClickSignout = async () => {
    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식임을 명시
          Authorization: `bearer ${localStorageToken}`,
        },
      });
      // if (response.ok) {
      //   window.localStorage.removeItem(localStorageToken); // 로컬 스토리지 내에 저장된 토큰을 삭제한다. - 추후 수정 예정
      //   alert("로그아웃 되었습니다");
      // }
      console.log(response);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
  return (
    <HeaderBackground>
      <LogoImg onClick={() => navigate("/")} src={devlinkLogo} alt="devlink-logo" />
      {islogin ? (
        <HeaderButtons>
          <label
            onClick={() => {
              setIslogin(!islogin);
              onClickSignout();
            }}>
            <img src={signoutIcon} alt="signout-icon" id="signout" /> <div>로그아웃</div>
          </label>
          <label
            onClick={() => {
              navigate(`/profile/${username}`);
            }}>
            <img src={userIcon} alt="user-icon" />
            <div>{username}</div>
          </label>
        </HeaderButtons>
      ) : (
        <HeaderButtons>
          <label
            onClick={() => {
              navigate("/signup");
            }}>
            <img src={signupIcon} alt="signup-icon" />
            <div>회원가입</div>
          </label>
          <label
            onClick={() => {
              navigate("/signin");
            }}>
            <img src={signinIcon} alt="signin-icon" />
            <div>로그인</div>
          </label>
        </HeaderButtons>
      )}
    </HeaderBackground>
  );
};

export default Header;

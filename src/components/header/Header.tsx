import React, { useEffect, useState } from "react";
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
  padding: 0;
  margin: 0;
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

// 유저 인터페이스 정의
interface User {
  _id: string;
  fullName: string;
  // 필요한 경우 다른 필드 추가
}

const Header: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  // 상단 내비게이션 : 클릭 시 해당 주소로 이동
  const navigate = useNavigate();

  // 로그인 확인 함수
  useEffect(() => {
    const checkLogin = () => {
      const token = window.localStorage.getItem("userToken");
      setIsLogin(!!token);
      setUserToken(token);
    };
    checkLogin();
  }, []);

  // 로그인 유저의 _id를 가져오는 함수
  const [loginUser, setLoginUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      if (userToken) {
        try {
          const response = await fetch(
            "https://kdt.frontend.5th.programmers.co.kr:5004/auth-user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // JSON 형식임을 명시
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("네트워크 응답이 정상적이지 않습니다.");
          }
          const data: User = await response.json();
          setLoginUser(data);
        } catch (error) {
          console.error("로그인 유저 데이터 가져오기 실패: ", error);
        }
      }
    };
    getUser();
  }, [userToken]);

  // 로그아웃 버튼 클릭 시 로그아웃 API 요청
  const onClickSignout = async () => {
    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식임을 명시
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.ok) {
        window.localStorage.removeItem("userToken"); // 로컬 스토리지 내에 저장된 토큰을 삭제한다. - 추후 수정 예정
        setIsLogin(false);
        alert("로그아웃 되었습니다");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <HeaderBackground>
      <LogoImg onClick={() => navigate("/")} src={devlinkLogo} alt="devlink-logo" />
      {isLogin ? (
        <HeaderButtons>
          <label
            onClick={() => {
              onClickSignout();
            }}>
            <img src={signoutIcon} alt="signout-icon" id="signout" /> <div>로그아웃</div>
          </label>
          <label
            onClick={() => {
              navigate(`/profile/${loginUser?._id}`);
            }}>
            <img src={userIcon} alt="user-icon" />
            <div>{loginUser?.fullName}</div>
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

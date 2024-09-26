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
`;

const HeaderButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 300px;
  height: 40px;
  margin: auto;
  margin-right: 10px;
  font-size: 15px;

  img {
    width: 20px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  label {
    display: flex;
    flex-direction: row;
    margin-right: 20px;
  }
`;

const Header = () => {
  // test : 로그인 or 비로그인 상황에 따라 다른 컴포넌트 적용 ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️
  const [islogin, setIslogin] = useState(true);
  const [username, setUsername] = useState("유저이름(수정필요)");
  // ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️  ‼️‼️삭제 예정‼️‼️

  // 상단 내비게이션 : 클릭 시 해당 주소로 이동
  const navigate = useNavigate();
  return (
    <HeaderBackground>
      <LogoImg onClick={() => navigate("/")} src={devlinkLogo} alt="devlink-logo" />
      {islogin ? (
        <HeaderButtons>
          <label
            onClick={() => {
              setIslogin(!islogin);
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
            <label>회원가입</label>
          </label>
          <label
            onClick={() => {
              navigate("/signin");
            }}>
            <img src={signinIcon} alt="signin-icon" />
            <label>로그인</label>
          </label>
        </HeaderButtons>
      )}
    </HeaderBackground>
  );
};

export default Header;

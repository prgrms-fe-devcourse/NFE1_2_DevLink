import React, { useEffect, useState } from "react";
import styled from "styled-components";
import onlineUserIcon from "../../assets/icons/onlineUserIcon.png";
import userIcon from "../../assets/icons/userIcon.png";
import onlineIcon from "../../assets/icons/onlineIcon.png";
import offlineIcon from "../../assets/icons/offlineIcon.png";
import { useNavigate } from "react-router-dom";

// 사용자 목록 가장 큰 테두리
const OnlineUserContainer = styled.div`
  position: absolute;
  top: 150px;
  right: 30px;
  width: 250px;
  max-height: 500px;
  /* border: 1px solid #ccc; // 보더라인 유무 - 추후 결정 */
  display: flex;
  flex-direction: column;
  /* overflow-x: hidden;
  overflow-y: scroll; */
`;

// "접속 중인 유저" 상단 타이틀
const OnlineUserTitle = styled.div`
  img {
    width: 10px;
    margin-right: 10px;
    pointer-events: none; // 클릭했을때 브라우저 오류를 예방하기 위한 코드
  }
  width: 250px;
  max-height: 500px;
  align-items: center;
  pointer-events: none; // 클릭했을때 브라우저 오류를 예방하기 위한 코드
`;

// "접속 중인 유저" 유저들 리스트
const OnlineUserList = styled.div`
  width: 250px;
  max-height: 500px;
  margin-top: 20px;
  margin-left: 10px;
`;

// 개별 유저 리스트 -> 프로필 사진(온라인/오프라인) : {user.fullName}
const OnlineUserBox = styled.div`
  img {
    width: 30px;
    margin-left: 10px;
    margin-right: 10px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

interface OnlineUserI {
  isOnline: string;
  _id: string;
  fullName: string;
}

const OnlineUser = () => {
  const navigate = useNavigate(); // 내비게이터
  const [onlineUserList, setOnlineUserList] = useState<OnlineUserI[]>([]);
  // 접속중인 유저 데이터를 API를 통해 가져온다. : fetchOnlineUser() 함수 생성
  useEffect(() => {
    const fetchOnlineUser = async () => {
      try {
        const response = await fetch(
          "https://kdt.frontend.5th.programmers.co.kr:5004/users/online-users"
        );
        const data = await response.json();
        setOnlineUserList(data);
      } catch (error) {
        console.error("온라인 유저 리스트 요청 실패 :", error);
      }
    };
    fetchOnlineUser();
  }, [onlineUserList]);

  return (
    <OnlineUserContainer>
      <OnlineUserTitle>
        {onlineUserList.length > 0 ? <img src={onlineIcon} /> : <img src={offlineIcon} />}
        접속 중인 유저
      </OnlineUserTitle>
      <OnlineUserList>
        {onlineUserList.map((user) => {
          return (
            <OnlineUserBox
              key={user._id}
              onClick={() => {
                navigate(`/profile/${user._id}`);
              }}>
              <img src={onlineUserIcon} />
              <div>{user.fullName}</div>
            </OnlineUserBox>
          );
        })}
      </OnlineUserList>
    </OnlineUserContainer>
  );
};

export default OnlineUser;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import onlineUserIcon from "../../assets/icons/onlineUserIcon.png";

const OnlineUserContainer = styled.div`
  position: absolute;
  top: 150px;
  right: 30px;
  width: 250px;
  max-height: 500px;
  border: 1px solid #ccc; // 보더라인 유무 - 추후 결정
  display: flex;
  flex-direction: column;
  /* overflow-x: hidden;
  overflow-y: scroll; */
`;

const OnlineUserTitle = styled.div`
  width: 250px;
  max-height: 500px;
`;

const OnlineUserList = styled.div`
  width: 250px;
  max-height: 500px;
`;

const OnlineUserBox = styled.div``;

interface OnlineUserI {
  isOnline: string;
  _id: string;
  fullName: string;
}

const OnlineUser = () => {
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
  }, []);

  // API로 가져온 데이터를 출력한다.
  // 만약 온라인이라면 "onlineUserIcon + user.fullName"
  // 만약 오프라인이라면 "userIcon + user.fullName"
  // 클릭 시 해당 유저의 프로필로 이동 : /profile/{user._id}

  return (
    <OnlineUserContainer>
      <OnlineUserTitle>접속 중인 유저</OnlineUserTitle>
      <OnlineUserList>
        <OnlineUserBox>프로필사진 / 유저이름1</OnlineUserBox>
        <OnlineUserBox>프로필사진 / 유저이름2</OnlineUserBox>
        <OnlineUserBox>프로필사진 / 유저이름3</OnlineUserBox>
      </OnlineUserList>
    </OnlineUserContainer>
  );
};

export default OnlineUser;

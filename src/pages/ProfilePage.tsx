import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import styled from "styled-components";
import profileIcon from "../assets/icons/profileIcon.png";
import { useLocation } from "react-router-dom";
import devlinkLogo from "../assets/images/devlinkLogo.png";

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 60px auto;
  width: 1000px;
  height: 220px;
`;

const ProfileInformation = styled.div`
  display: flex;
  width: 600px;
  height: 160px;
  margin: 0 200px;
  margin-bottom: 20px;
`;

const ProfileIcon = styled.img`
  width: 160px;
  height: 160px;
`;

const ProfileTexts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  div {
    display: flex;
    margin-bottom: 20px;
  }
`;

const ProfileName = styled.div`
  font-size: 30px;
  margin-right: 50px;
`;

const EditProfileButton = styled.button`
  width: 100px;
  height: 30px;
`;

const ProfileEmail = styled.div``;

const UserPostCount = styled.div``;

const DividerLine = styled.div`
  width: 1000px;
  height: 20px;
  margin: 5px;
  text-align: center;
  border-top: 1px solid #cccccc;
  div {
    margin-top: 5px;
  }
`;

const PostList = styled.div`
  width: 1000px;
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
`;

const PostListItem = styled.div`
  min-width: 400px;
  min-height: 400px;
  background-color: lightgray;
  margin: 50px;
  text-align: center;
`;

const EditProfileModal = styled.div`
  position: absolute;
  top: 250px;
  width: 400px;
  height: 500px;
  padding: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: #fff;
`;

const LogoStyle = styled.img`
  width: 200px;
  height: 60px;
  margin-bottom: 30px;
`;

const InputStyle = styled.input`
  width: 370px;
  padding: 15px;
  margin-top: 30px;
`;

const Requirements = styled.div`
  margin-left: 5px;
  margin-top: 5px;
  width: 300px;
  font-size: 12px;
  opacity: 0.6;
`;

const SubmitBox = styled.div`
  display: flex;
  width: 180px;
  justify-content: space-between;
  margin-left: 220px;
  margin-top: 30px;
  button {
    width: 80px;
    text-align: center;
    align-items: center;
    border: 1px solid lightgray;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #cccccc;
    }
  }
`;

interface UserData {
  isOnline: boolean;
  _id: string;
  fullName: string;
  email: string;
}

const ProfilePage = () => {
  // 더미 데이터 : 삭제 예정 (테스트용)
  const [loginUserId, setLoginUserId] = useState("66fa083edcd3f57353a2a11f");
  const [loginToken, setLoginToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZmEwODNlZGNkM2Y1NzM1M2EyYTExZiIsImVtYWlsIjoiYWFhQG5hdmVyLmNvbSJ9LCJpYXQiOjE3Mjc3Njg1NTJ9.WctUa6ktFfTIFpZ8Rw-3Kkj68-v8d6ddcvU6aMZExQc"
  );
  // =========================================================
  const location = useLocation();
  const userId = location.pathname.substring(9);
  const [postList, setPostList] = useState<any>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [inputFullName, setInputFullName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputCheckPassword, setInputCheckPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
        setInputFullName(data.fullName); // user.fullName을 inputFullName으로 설정
      } catch (error) {
        console.error(`${userId}의 유저 데이터를 가져오지 못했습니다`, error);
      }
    };
    getUser();
  }, [isModalOpen]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/posts/author/${userId}`
        );
        const data = await response.json();
        setPostList(data);
      } catch (error) {
        console.error(`<_ID : ${userId}>의 작성된 포스트 목록을 가져오지 못했습니다`, error);
      }
    };
    getPost();
  }, []);

  const validate = () => {
    if (!inputFullName || inputFullName.includes(" ") || inputFullName.length > 8) {
      alert("이름은 8자 이하, 공백 미포함입니다.");
      return false;
    }
    // 최소 1개 이상의 영문, 숫자, 특수문자가 포함된 총 8~16자의 비밀번호
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!passwordRegex.test(inputPassword)) {
      alert("비밀번호는 공백을 포함할 수 없으며, 영문+특수문자+숫자를 포함한 8~16자여야 합니다");
      return false;
    }
    if (inputPassword !== inputCheckPassword) {
      alert("비밀번호와 비밀번호 확인란의 비밀번호가 서로 다릅니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 제출 동작 방지
    if (validate()) {
      try {
        await updateUser(); // 사용자 업데이트
        await updatePassword(); // 비밀번호 업데이트
        alert("수정 완료");
        setIsModalOpen(false); // 모달 닫기
      } catch (error) {
        console.error("수정 중 오류 발생:", error);
      }
    }
  };

  const updateUser = async () => {
    const requestBody = {
      fullName: inputFullName,
      username: "", // 사용자 이름은 필요에 따라 추가하세요
    };

    const response = await fetch(
      "https://kdt.frontend.5th.programmers.co.kr:5004/settings/update-user",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON 형식임을 명시
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`사용자 업데이트 실패: ${errorText}`);
    }
  };

  const updatePassword = async () => {
    const requestBody = {
      password: inputPassword,
    };

    const response = await fetch(
      "https://kdt.frontend.5th.programmers.co.kr:5004/settings/update-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`비밀번호 변경 실패: ${errorText}`);
    }
  };

  // InputStyle 수정
  <InputStyle
    type="text" // 올바른 타입으로 수정
    name="fullName"
    placeholder="이름"
    value={inputFullName}
    onChange={(e) => {
      setInputFullName(e.target.value);
    }}
  />;

  {
    /* 수정 취소 버튼에 preventDefault 추가 */
  }
  <button
    onClick={(e) => {
      e.preventDefault(); // 기본 행동 방지
      setIsModalOpen(false);
    }}>
    수정 취소
  </button>;

  return (
    <>
      <Header />
      <UserProfile>
        <ProfileInformation>
          <ProfileIcon src={profileIcon} />
          <ProfileTexts>
            <div>
              <ProfileName>{user?.fullName}</ProfileName>
              {userId === loginUserId && (
                <EditProfileButton onClick={() => setIsModalOpen(true)}>
                  Edit Profile
                </EditProfileButton>
              )}
            </div>
            <ProfileEmail>{user?.email}</ProfileEmail>
            <UserPostCount>게시글: {postList.length}개</UserPostCount>
          </ProfileTexts>
        </ProfileInformation>
        <DividerLine>
          <div>게시글</div>
        </DividerLine>
        <PostList>
          {postList.map((post: any, index: number) => (
            <PostListItem key={post.id || index}>{post.title}</PostListItem>
          ))}
        </PostList>
        {isModalOpen && (
          <EditProfileModal>
            <LogoStyle src={devlinkLogo} alt="devlinkLogo" />
            <form onSubmit={handleSubmit}>
              <InputStyle
                type="fullName"
                name="fullName"
                placeholder="이름"
                value={inputFullName}
                onChange={(e) => {
                  setInputFullName(e.target.value);
                }}
              />
              <Requirements>이름은 8자 이하여야 합니다.</Requirements>
              <InputStyle
                type="password"
                name="password"
                placeholder="비밀번호"
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
              />
              <Requirements>비밀번호는 영문+특수문자+숫자를 포함한 8~16자여야 합니다</Requirements>
              <InputStyle
                type="password"
                name="password-check"
                placeholder="비밀번호 확인"
                onChange={(e) => {
                  setInputCheckPassword(e.target.value);
                }}
              />
              <Requirements>비밀번호는 영문+특수문자+숫자를 포함한 8~16자여야 합니다</Requirements>
              <SubmitBox>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}>
                  수정 취소
                </button>
                <button type="submit">수정 완료</button>
              </SubmitBox>
            </form>
          </EditProfileModal>
        )}
      </UserProfile>
    </>
  );
};

export default ProfilePage;

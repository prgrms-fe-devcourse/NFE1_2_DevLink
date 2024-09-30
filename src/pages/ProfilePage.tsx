import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import styled from "styled-components";
import profileIcon from "../assets/icons/profileIcon.png";
import { useLocation } from "react-router-dom";

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

interface UserData {
  isOnline: boolean;
  _id: string;
  fullName: string;
  email: string;
}

const ProfilePage = () => {
  const location = useLocation();
  const userId = location.pathname.substring(9); // 사용자 ID 추출
  const [postList, setPostList] = useState<any>([]);
  const [user, setUser] = useState<UserData | null>(null); // 초기값을 null로 설정

  // 특정 사용자의 포스트 목록 가져오기
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/posts/author/${userId}`
        );
        const data = await response.json();
        console.log("post data 확인:", data); // test
        setPostList(data);
      } catch (error) {
        console.error(`<_ID : ${userId}>의 작성된 포스트 목록을 가져오지 못했습니다`, error);
      }
    };
    getPost();
  }, [userId]);

  // 특정 사용자의 유저 정보 가져오기
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(`${userId}의 유저 데이터를 가져오지 못했습니다`, error);
      }
    };
    getUser();
  }, [userId]);

  return (
    <>
      <Header />
      <UserProfile>
        <ProfileInformation>
          <ProfileIcon src={profileIcon} />
          <ProfileTexts>
            <div>
              <ProfileName>{user?.fullName}</ProfileName>
              <EditProfileButton onClick={() => {}}>Edit Profile</EditProfileButton>
            </div>
            <ProfileEmail>{user?.email}</ProfileEmail>
            <UserPostCount>게시글: {postList.length}개</UserPostCount>
          </ProfileTexts>
        </ProfileInformation>
        <DividerLine>
          <div>게시글</div>
        </DividerLine>
        <PostList>
          {postList.map((post: any) => (
            <PostListItem key={post.id}>post: {post.title}</PostListItem> // key 추가
          ))}
        </PostList>
      </UserProfile>
    </>
  );
};

export default ProfilePage;

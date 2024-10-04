import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ProfileHeader from "../components/my-page/ProfileHeader";
import EditProfileModal from "../components/my-page/EditProfileModal";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PostCard from "../components/Post/PostCard";

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 60px auto;
  width: 1000px;
  height: 220px;
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
  posts: [];
}

const ProfilePage = () => {
  const navigator = useNavigate();
  // 현재 주소에 따라 마이페이지 보여주기
  const location = useLocation(); // 삭제 금지
  const urlUserId = location.pathname.substring(9); // 삭제 금지

  // 더미 데이터 : 리덕스 완성 시 삭제 예정
  const loginToken = window.localStorage.getItem("userToken") || ""; // 기본값 설정

  // ==============================
  const [postList, setPostList] = useState<any>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [inputFullName, setInputFullName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputCheckPassword, setInputCheckPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그인 유저의 _id를 가져오는 함수
  const [loginUserId, setLoginUserId] = useState<string>("");
  useEffect(() => {
    const fetchLoginUserData = async () => {
      if (loginToken) {
        try {
          const response = await fetch(
            "https://kdt.frontend.5th.programmers.co.kr:5004/auth-user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("네트워크 응답이 정상적이지 않습니다.");
          }
          const data: UserData = await response.json();
          setLoginUserId(data._id);
          setInputFullName(data.fullName); // 로그인 유저의 이름을 입력 필드에 설정
        } catch (error) {
          console.error("로그인 유저 데이터 가져오기 실패: ", error);
        }
      }
    };
    fetchLoginUserData();
  }, [loginToken]);

  // 유저 정보 가져오기
  useEffect(() => {
    const getUser = async () => {
      if (urlUserId) {
        try {
          const response = await fetch(
            `https://kdt.frontend.5th.programmers.co.kr:5004/users/${urlUserId}`
          );
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error(`${urlUserId}의 유저 데이터를 가져오지 못했습니다`, error);
        }
      }
    };
    getUser();
  }, [urlUserId]);

  // 게시물 목록 가져오기
  useEffect(() => {
    const getPost = async () => {
      if (urlUserId) {
        try {
          const response = await fetch(
            `https://kdt.frontend.5th.programmers.co.kr:5004/posts/author/${urlUserId}`
          );
          const data = await response.json();
          setPostList(data);
          console.log(data);
        } catch (error) {
          console.error(`게시글 목록을 가져오지 못했습니다`, error);
        }
      }
    };
    getPost();
  }, [urlUserId]);

  // 수정 완료 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 제출 동작 방지
    // 유효성 검사 및 업데이트 로직
  };

  return (
    <>
      <Header />
      <UserProfile>
        <ProfileHeader
          loginUserId={loginUserId}
          user={user}
          onEditClick={() => setIsModalOpen(true)}
        />
        <PostList>
          {/* {postList.map((post: any, index: number) => (
            <PostListItem key={post.id || index}>{post.title}</PostListItem>
          ))} */}
          {postList.map((post: any, index: number) => (
            <PostCard postId={post._id}></PostCard>
          ))}
        </PostList>
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          inputFullName={inputFullName}
          setInputFullName={setInputFullName}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          inputCheckPassword={inputCheckPassword}
          setInputCheckPassword={setInputCheckPassword}
          loginToken={loginToken}
        />
      </UserProfile>
    </>
  );
};

export default ProfilePage;

// components/ProfileHeader.tsx
import React from "react";
import styled from "styled-components";
import profileIcon from "../../assets/icons/profileIcon.png";

// 프로필 정보를 위한 스타일
const ProfileInformation = styled.div`
  display: flex;
  width: 600px;
  height: 160px;
  margin: 0 200px;
  margin-bottom: 20px;
`;

// 프로필 아이콘 스타일
const ProfileIcon = styled.img`
  width: 160px;
  height: 160px;
`;

// 프로필 텍스트 스타일
const ProfileTexts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  div {
    display: flex;
    margin-bottom: 20px;
  }
`;

// 이름 스타일
const ProfileName = styled.div`
  font-size: 30px;
  margin-right: 50px;
`;

// 이메일 스타일
const ProfileEmail = styled.div``;

// 게시글 수 스타일
const UserPostCount = styled.div``;

// 프로필 편집 버튼 스타일
const EditProfileButton = styled.button`
  width: 100px;
  height: 30px;
`;

interface UserData {
  isOnline: boolean;
  _id: string;
  fullName: string;
  email: string;
  posts: [];
}
// ProfileHeader 컴포넌트
interface ProfileHeaderProps {
  loginUserId: string;
  user: UserData | null; // UserData 타입을 사용
  onEditClick: () => void; // 클릭 핸들러의 타입을 정의
}

// ProfileHeader 컴포넌트
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ loginUserId, user, onEditClick }) => {
  return (
    <ProfileInformation>
      <ProfileIcon src={profileIcon} />
      <ProfileTexts>
        <div>
          <ProfileName>{user?.fullName}</ProfileName>
          {user?._id === loginUserId && (
            <EditProfileButton onClick={onEditClick}>Edit Profile</EditProfileButton>
          )}
        </div>
        <ProfileEmail>{user?.email}</ProfileEmail>
        <UserPostCount>게시글: {user?.posts.length}개</UserPostCount>
      </ProfileTexts>
    </ProfileInformation>
  );
};

export default ProfileHeader;

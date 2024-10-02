// PostDetailPage.tsx
import React, { useEffect, useState } from "react";
import { Switch, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UserOutlined, CopyOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Comment from "../components/Post/Comment";
import LikeButtonPostDetailPage from "../components/Post/LikeButtonPostDetailPage";

// Styled Components for layout and styles
const PostWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  box-sizing: border-box; /* 추가 */
`;

const PostHeader = styled.div``;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const FirstLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
`;

const AuthorDateWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Author = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const StyledDate = styled.p`
  font-size: 24px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: #999;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* padding-bottom: 15px; */
`;

const StyledButton = styled(Button)`
  font-size: 24px;
  color: #999;
  line-height: 1.2;
  padding: 8px 16px;
  min-height: 36px;
`;

const Summary = styled.p`
  font-size: 18px;
  /* font-style: italic; */
  color: #666;
  margin-bottom: 20px;
`;

const BodyText = styled.p`
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 18px;
  line-height: 1.5;
`;

const CodeSection = styled.div`
  width: 100%;
  height: 619px;
  flex-direction: column;
  background-color: #f0f0f0;
  margin-top: 7px;
  box-sizing: border-box; /* 추가 */
  border-radius: 8px;
  overflow: hidden;
`;

const CodeHeader = styled.div`
  background-color: #888888;
  color: white;
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

// 오른쪽 영역을 묶을 컨테이너
const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

// 스위치와 텍스트를 담을 컨테이너
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px; /* 복사 버튼과의 간격 추가 */
`;

const SwitchText = styled.span`
  margin-right: 8px;
  font-size: 18px;
`;

const HeaderTitle = styled.span`
  font-size: 16px;
`;

const CopyButton = styled(Button)`
  background-color: #888888;
  color: white;
  border: none;
  &:hover {
    background-color: #777;
  }
`;

const CodeContent = styled.pre`
  padding: 20px;
  margin: 0;
  font-size: 14px;
  overflow: auto;
  background-color: inherit;
  flex-grow: 1;
`;

const PreviewContent = styled.div`
  padding: 20px;
  margin: 0;
  overflow: auto;
  background-color: inherit;
  flex-grow: 1;
`;

// Author 타입 정의
interface Author {
  fullName: string;
  email: string;
  _id: string;
}

// Post 타입 정의
interface Post {
  _id: string;
  title: string;
  author: Author;
  createdAt: string; // 작성 날짜 추가
  bodytext: string;
  summary: string;
  likes: any[]; //배열임
  comments: any[]; //배열임
  code: string;
  preview: string;
}

// PostCardProps 타입 정의
// interface PostDetailPageProps {
//   postId: string;
// }

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null); // API에서 가져온 데이터를 저장할 state
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리
  const [showPreview, setShowPreview] = useState<boolean>(true); // 토글 스위치 상태 관리
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { postId } = useParams(); // URL에서 postId를 추출
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setPost(data); // 데이터를 state에 저장
      } catch (err: any) {
        setError(err.message); // 에러 처리
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchPost(); // 컴포넌트가 마운트될 때 API 요청
  }, []);

  //로그인한 사용자 ID 호출 (본인일 때 버튼 활성화 때문)
  useEffect(() => {
    const fetchUserData = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) return;

      try {
        const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/auth-user", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setCurrentUserId(userData._id); //로그인한 사용자의 ID로 설정
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 대 실패했습니다", error);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>; // 데이터를 가져오는 동안 로딩 메시지
  }

  if (error) {
    return <div>에러 발생: {error}</div>; // 에러 발생 시 메시지
  }

  // 토글 스위치 상태 변경 핸들러
  const handleToggle = (checked: boolean) => {
    setShowPreview(checked); // 스위치 상태에 따라 showPreview 상태를 업데이트
  };

  //작성자 클릭 시 마이페이지 네비게이터
  const handleAuthorClick = () => {
    navigate(`/profile/${post?.author._id}`);
  };

  //수정 버튼 네비게이터
  const handleModify = () => {
    navigate(`/post/modify/:postId`);
  };

  // 코드 복사 기능 추가
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      console.log("코드가 복사되었습니다.");
    });
  };

  //삭제 함수
  const handleDelete = async (postId: string) => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/posts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          id: postId,
        }),
      });

      if (!response.ok) {
        throw new Error("포스트 삭제 실패");
      }

      console.log("포스트가 성공적으로 삭제되었습니다.");
      // 삭제 후 마이페이지로 네비게이터
      navigate("/profile/:userId");
    } catch (error) {
      message.error("포스트 삭제 중 오류 발생");
    }
  };

  return (
    <PostWrapper>
      {/* 제목, 작성자, 작성일 */}
      <PostHeader>
        <Title>{post?.title}</Title>
        <FirstLineWrapper>
          <AuthorDateWrapper>
            <Author onClick={handleAuthorClick}>
              <UserOutlined />
              {post?.author.fullName}
            </Author>
            <StyledDate>{post && new Date(post.createdAt).toLocaleDateString("ko-KR")}</StyledDate>
          </AuthorDateWrapper>

          {/* 수정, 삭제 버튼 */}
          <ButtonsWrapper>
            {post?.author._id === currentUserId && (
              <>
                <StyledButton type="text" onClick={handleModify}>
                  수정
                </StyledButton>
                {post?._id && (
                  <StyledButton type="text" onClick={() => handleDelete(post._id)}>
                    삭제
                  </StyledButton>
                )}
              </>
            )}
          </ButtonsWrapper>
        </FirstLineWrapper>
      </PostHeader>
      <Summary>한줄 요약 {post?.summary}</Summary>

      {/* 토글 상태에 따른 이미지 표시 */}
      {showPreview ? (
        <CodeSection>
          <CodeHeader>
            <HeaderTitle>component</HeaderTitle>
            <RightContainer>
              <CopyButton icon={<CopyOutlined />} onClick={() => handleCopyCode(post?.code || "")}>
                코드 복사
              </CopyButton>
              {/* 토글 스위치 */}
              <SwitchContainer>
                <SwitchText>{showPreview ? "Preview" : "Code"}</SwitchText>
                <Switch checked={showPreview} onChange={handleToggle} />
              </SwitchContainer>
            </RightContainer>
          </CodeHeader>
          <PreviewContent>
            {post?.preview ? <p>{post.preview}</p> : <p>렌더링이 실패했습니다.</p>}
          </PreviewContent>
        </CodeSection>
      ) : (
        <CodeSection>
          <CodeHeader>
            <HeaderTitle>component</HeaderTitle>
            <RightContainer>
              <CopyButton icon={<CopyOutlined />} onClick={() => handleCopyCode(post?.code || "")}>
                코드 복사
              </CopyButton>
              {/* 토글 스위치 */}
              <SwitchContainer>
                <SwitchText>{showPreview ? "Preview" : "Code"}</SwitchText>
                <Switch checked={showPreview} onChange={handleToggle} />
              </SwitchContainer>
            </RightContainer>
          </CodeHeader>
          <CodeContent>{post?.code || "코드가 없습니다."}</CodeContent>
        </CodeSection>
      )}
      <BodyText>본문 텍스트 {post?.bodytext}</BodyText>
      <hr />

      <LikeButtonPostDetailPage
        postId={post?._id ? post._id.toString() : ""}
        initialLikeCount={post?.likes.length ?? 0}
        style={{ marginBottom: "70px" }}
      />

      {postId && <Comment postId={postId ?? ""} />}
    </PostWrapper>
  );
};
export default PostDetailPage;

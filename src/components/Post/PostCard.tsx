import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import CodeRenderer from "./CodeRender";

// Post 타입 정의
interface Post {
  _id: string;
  title: string;
  author: Author;
  createdAt: string; // 작성 시간
  summary: string; // 한 줄 요약
  likes: any[]; //배열임
  comments: any[]; //배열임
  preview: string;
  code: string;
  parsedTitle?: {
    title: string;
    code: string;
  };
}

// Author 타입 정의
interface Author {
  fullName: string;
  email: string;
  _id: string;
}

// PostCardProps 타입 정의
interface PostCardProps {
  postId: string;
}

// Styled Components /////////////////////////////////////////////////
const StyledCard = styled(Card)`
  border: 1px solid #9b9b9b;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 610px;
  height: 570px;
  box-sizing: border-box;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  background-color: #e9e9e9;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  height: 343px;
  width: 610px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #333;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SecondLine = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledUserOutlined = styled(UserOutlined)`
  font-size: 16px; /* 아이콘 크기 조정 */
  vertical-align: middle; /* 수평 정렬 */
  margin: 0;
`;

const PostInfo = styled.div`
  padding: 30px 15px 0 35px;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const PostAuthor = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const PostDate = styled.p`
  color: #a0a0a0;
  font-size: 0.9rem;
`;

const PostSummary = styled.p`
  color: #555;
  font-size: 18px;
  margin-top: 25px;
`;

const PostCard: React.FC<PostCardProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null); // 하나의 포스트를 가져옴
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  //작성자 클릭 시 마이페이지로 네비게이터 함수
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모로 이벤트 전파 중지
    navigate(`/profile/${post?.author._id}`);
  };

  //포스트 클릭 시 상세페이지로 네비게이터 함수
  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`); //절대 경로 사용
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://kdt.frontend.5th.programmers.co.kr:5004/posts/${postId}`
      );

      const data = await response.json();
      setPost(data); // 응답이 단일 객체이므로 그대로 설정
    } catch (error) {
      console.error("Failed to fetch post", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>로딩중임 !!!</div>;
  }

  // post가 비어있지 않은지 확인하기 위한 콘솔 출력
  console.log("post 정보 : ", post); // 렌더링 전에 post의 상태 확인

  if (!post) {
    return <div>포스트 없어요 !!!</div>;
  }

  return (
    <StyledCard bodyStyle={{ padding: "0" }} onClick={() => handlePostClick(post._id)}>
      <PreviewContainer>
        {(() => {
          try {
            // title을 JSON.parse로 파싱해서 code를 추출
            const parsedTitle = JSON.parse(post.title);
            return parsedTitle.code ? (
              <CodeRenderer data={parsedTitle.code} />
            ) : (
              "No Preview Available"
            );
          } catch (e) {
            console.error("JSON 파싱 오류: ", e);
            return "No Preview Available"; // JSON 파싱에 실패할 경우
          }
        })()}
      </PreviewContainer>

      <PostInfo>
        <FirstLine>
          <PostTitle>
            {(() => {
              try {
                const parsedTitle = JSON.parse(post.title);
                return parsedTitle.title; // title 값만 반환
              } catch (e) {
                return post.title; // 단순 문자열일 경우 그대로 반환
              }
            })()}
          </PostTitle>
          <LikeButton post={post} initialLikeCount={post.likes.length} />
        </FirstLine>
        <SecondLine>
          <AuthorContainer onClick={handleAuthorClick}>
            <StyledUserOutlined />
            <PostAuthor>{post.author.fullName}</PostAuthor>
          </AuthorContainer>
          <PostDate>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</PostDate>
          <PostDate>{post.comments.length}개의 댓글</PostDate>
        </SecondLine>
        <PostSummary>
          {(() => {
            try {
              const parsedTitle = JSON.parse(post.title.replace(/[\u0000-\u001F\u007F]/g, "")); // 제어 문자 제거
              return parsedTitle.summary ? parsedTitle.summary : "작성된 한줄 요약이 없습니다.";
            } catch (e) {
              console.error("JSON 파싱 오류: ", e);
              return "작성된 한줄 요약이 없습니다."; // JSON 파싱 실패 시
            }
          })()}
        </PostSummary>
      </PostInfo>
    </StyledCard>
  );
};

export default PostCard;

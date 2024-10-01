import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "antd";
import LikeButton from "./LikeButton";

// Author 타입 정의
interface Author {
  fullName: string;
  email: string;
}

// Post 타입 정의
interface Post {
  _id: string;
  title: string;
  author: Author;
  createdAt: string; // 작성 시간
  summary: string; // 한 줄 요약
  likes: any[]; //배열임
  comments: any[]; //배열임
}

// PostCardProps 타입 정의
interface PostCardProps {
  channelId: string;
}

// Styled Components
const StyledCard = styled(Card)`
  border: 1px solid #9b9b9b;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 610px;
  height: 570px;
`;

const ImagePlaceholder = styled.div`
  background-color: #e9e9e9;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  height: 343px;
  width: 610px;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SecondLine = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

const PostCard: React.FC<PostCardProps> = ({ channelId }) => {
  const [post, setPost] = useState<Post | null>(null); // 하나의 포스트를 가져옴
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://kdt.frontend.5th.programmers.co.kr:5004/posts/66778ce2418f192f946d0ca6`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setPost(data[0]); // 배열이면 첫 번째 포스트 가져오기
      } else {
        setPost(data); // 단일 객체일 경우 그대로 설정
      }
    } catch (error) {
      console.error("Failed to fetch post", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [channelId]);

  if (loading) {
    return <div>로딩중임 !!!</div>;
  }

  // post가 비어있지 않은지 확인하기 위한 콘솔 출력
  console.log("post 정보 : ", post); // 렌더링 전에 post의 상태 확인

  if (!post) {
    return <div>포스트 없어요 !!!</div>;
  }

  return (
    <StyledCard bodyStyle={{ padding: "0" }}>
      <ImagePlaceholder />
      <PostInfo>
        <FirstLine>
          <PostTitle>
            {post.title.length > 15 ? post.title.substring(0, 15) + "..." : post.title}
          </PostTitle>
          <LikeButton postId={post._id} initialLikeCount={post.likes.length} />
        </FirstLine>
        <SecondLine>
          <PostAuthor>{post.author.fullName}</PostAuthor>
          <PostDate>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</PostDate>
          <PostDate>{post.comments.length}개의 댓글</PostDate>
        </SecondLine>
        <PostSummary>한줄요약 : 불러올 데이터가 없음 {post.summary}</PostSummary>
      </PostInfo>
    </StyledCard>
  );
};

export default PostCard;

import React, { useState } from "react";
import { message } from "antd";
import styled from "styled-components";

interface Post {
  author: Author;
  _id: string;
}

interface Author {
  fullName: string;
  email: string;
  _id: string;
}

interface LikeButtonProps {
  post: Post; // post 정보를 props로 받음
  initialLikeCount: number;
  style?: React.CSSProperties; // 스타일 속성 추가
}

// 스타일 (포스트카드용)
const LikeContainer = styled.div`
  display: flex;
  align-items: center; /*세로축*/
  justify-content: center; /*가로축*/
  gap: 5px;

  button {
    padding: 0; /* 버튼 내부의 기본 패딩 제거 */
    margin-right: 2px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 0; /* 텍스트의 기본 마진 제거 */
    vertical-align: middle; /* 텍스트를 가운데 정렬 */
    font-size: 18px;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const LikeButton: React.FC<LikeButtonProps> = ({ post, initialLikeCount, style }) => {
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeId, setLikeId] = useState<string | null>(null); // 좋아요 ID 저장

  // 좋아요 처리 및 취소 함수
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 중지 (이벤트 버블링)

    const jwtToken = localStorage.getItem("userToken");

    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };

    try {
      if (isLiked && likeId) {
        // 좋아요 취소 처리
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/likes/delete`,
          {
            method: "DELETE",
            headers,
            body: JSON.stringify({ id: likeId }), // 좋아요 ID를 사용하여 삭제 요청
          }
        );

        if (!response.ok) {
          message.error(`좋아요 취소 실패: ${response.statusText}`);
          return;
        }

        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
        setLikeId(null); // 좋아요 ID 초기화
        console.log("좋아요 취소 처리 완료");
      } else {
        // 좋아요 처리
        const response = await fetch(
          "https://kdt.frontend.5th.programmers.co.kr:5004/likes/create",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ postId: post._id }), // post._id 사용
          }
        );

        if (!response.ok) {
          message.error(`좋아요 처리 실패: ${response.statusText}`);
          return;
        }

        const data = await response.json(); // 좋아요 처리 결과
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
        setLikeId(data._id); // 좋아요 ID 저장
        console.log("좋아요 처리 완료");

        // 알림 생성 요청
        await createNotification(data._id, post, jwtToken);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  // 알림 생성 함수
  const createNotification = async (likeId: string, post: Post, jwtToken: string) => {
    try {
      const response = await fetch(
        "https://kdt.frontend.5th.programmers.co.kr:5004/notifications/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            notificationType: "LIKE",
            notificationTypeId: likeId,
            userId: post.author._id, // 포스트 작성한 사람
            postId: post._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("알림 생성 실패");
      }

      console.log("알림 생성 완료");
    } catch (error) {
      console.error("알림 생성 중 오류 발생:", error);
    }
  };

  return (
    <LikeContainer style={style}>
      <button
        onClick={handleLike}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}>
        {isLiked ? (
          <img src="/heart_icon_fill.png" alt="검정하트 24px" />
        ) : (
          <img src="/heart_icon_empty.png" alt="빈하트" />
        )}
      </button>
      <p>좋아요 {likeCount}개</p>
    </LikeContainer>
  );
};

export default LikeButton;

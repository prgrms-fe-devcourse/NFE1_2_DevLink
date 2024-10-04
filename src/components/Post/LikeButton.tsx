import React, { useState } from "react";
import { Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  imageSize?: string;
  fontSize?: string;
  imageSrc?: string;
  imageAlt?: string;
  style?: React.CSSProperties; // 스타일 속성 추가
}

// style(포스트카드용)
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

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikeCount, style }) => {
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // 좋아요 처리 함수
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 중지 (이벤트버블링)

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };

    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/likes/create", {
        method: "POST",
        headers,
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        // 서버가 502 또는 다른 에러를 반환할 때
        if (response.status === 502) {
          console.error("서버 문제로 요청을 처리할 수 없습니다 (502 Bad Gateway).");
        } else if (response.status === 401) {
          console.error("인증 실패: JWT 토큰이 유효하지 않거나 만료되었습니다.");
        } else {
          console.error(`에러 발생: ${response.status} - ${response.statusText}`);
        }
        return;
      }

      const data = await response.json();
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      console.log("좋아요 처리 완료");
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <LikeContainer style={style}>
      <button
        onClick={handleLike}
        disabled={isLiked}
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

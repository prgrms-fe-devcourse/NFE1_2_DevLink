import React, { useState } from "react";
import { Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";

interface LikeButtonPostDetailPageProps {
  postId: string;
  initialLikeCount: number;
  imageSize?: string;
  fontSize?: string;
  imageSrc?: string;
  imageAlt?: string;
  style?: React.CSSProperties; // 스타일 속성 추가
}

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 32px;
    margin: 0;
  }

  button {
    margin: 0;
  }

  img {
    margin: 0;
  }
`;

const LikeButtonPostDetailPage: React.FC<LikeButtonPostDetailPageProps> = ({
  postId,
  initialLikeCount,
  style,
}) => {
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeId, setLikeId] = useState<string | null>(null); // 좋아요 ID 저장

  // 좋아요 처리 함수
  const handleLike = async () => {
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

        console.log("좋아요 취소 응답 상태 코드", response.status);
        const responseBody = await response.text(); // 응답 내용을 text로 확인
        console.log("좋아요 취소 응답 바디", responseBody);

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
            body: JSON.stringify({ postId }),
          }
        );

        console.log("좋아요 응답 상태 코드", response.status);
        const responseBody = await response.text(); // 응답 내용을 text로 확인
        console.log("좋아요 응답 바디", responseBody);

        if (!response.ok) {
          message.error(`좋아요 처리 실패: ${response.statusText}`);
          return;
        }

        const data = JSON.parse(responseBody); // 응답 데이터를 JSON으로 변환
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
        setLikeId(data._id); // 좋아요 ID 저장
        console.log("좋아요 처리 완료", data);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      message.error("좋아요 처리 중 오류 발생");
    }
  };

  return (
    <LikeContainer style={style}>
      <button
        onClick={handleLike}
        disabled={isLiked}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}>
        {isLiked ? (
          <img src="/heart_icon_fill_40px.png" alt="검정하트 40px" />
        ) : (
          <img src="/heart_icon_empty_40px.png" alt="빈하트" />
        )}
      </button>
      <h2>좋아요 {likeCount}개</h2>
    </LikeContainer>
  );
};

export default LikeButtonPostDetailPage;

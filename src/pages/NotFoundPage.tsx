import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 404 이미지 스타일 지정
const ImageStyle = styled.img`
  /* width: 1055px;
  height: 645px; */
`;

const PageStyle = styled.div`
  display: flex;
  margin-top: 30px;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 이미지 변경 예정 */}
      <ImageStyle src="src\assets\images\logo.png" alt="404 이미지" />
      <button onClick={() => navigate("/")}>메인페이지로 이동</button>
    </div>
  );
};

export default NotFoundPage;

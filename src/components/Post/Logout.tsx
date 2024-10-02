import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("로그아웃 실패");
      }

      // 로그아웃 성공 시 토큰 삭제
      localStorage.removeItem("jwtToken");
      message.success("로그아웃 성공");
      navigate("/signin"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      message.error("로그아웃 중 오류 발생");
    }
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;

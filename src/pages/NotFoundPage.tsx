import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Result } from "antd";
import { useTheme } from "../theme/ThemeContext";

const PageStyle = styled.div<{ darkMode: boolean }>`
  width: 1055px;
  height: 645px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
  background-color: ${({ darkMode }) => (darkMode ? "#888b97" : "#F9F9F9")};
  border: ${({ darkMode }) => (darkMode ? " 1px solid #6c707a" : " 1px solid #efefef")};
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const { darkMode } = useTheme();

  return (
    <PageStyle darkMode={darkMode}>
      <Result
        status="404"
        title="Page Not Found"
        subTitle="죄송합니다. 페이지를 찾을 수 없습니다."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            메인으로
          </Button>
        }
      />
    </PageStyle>
  );
};

export default NotFoundPage;

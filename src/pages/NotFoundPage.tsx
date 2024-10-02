import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Result } from "antd";

const PageStyle = styled.div`
  width: 1055px;
  height: 645px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
  border: 1px solid #efefef;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageStyle>
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

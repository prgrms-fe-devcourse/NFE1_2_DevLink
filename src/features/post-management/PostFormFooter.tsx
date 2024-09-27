import { Button } from "antd";
import styled from "styled-components";

import { config } from "./config";

const PostFormFooter = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Button>임시 저장</Button>
        <Button>포스트 생성</Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.footer`
  display: flex;
  height: ${style.bottom.height}px;
  align-items: center;
  justify-content: center;
  background: green;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 100px;
  justify-content: center;
  width: ${style.container.width}px;
  background: powderblue;
`;

export default PostFormFooter;

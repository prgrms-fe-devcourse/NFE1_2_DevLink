import { Button } from "antd";
import styled from "styled-components";

import { config } from "./config";

const PostFormHeader = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Button>포스트 미리보기</Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${style.top.height}px;
  /* background: green; */
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  width: ${style.container.width}px;
  padding: 40px;
  border-radius: 6px 6px 0 0;
  background: ${style.background};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default PostFormHeader;

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
  background: ${style.background};
`;

export default PostFormHeader;

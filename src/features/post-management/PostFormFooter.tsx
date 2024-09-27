import { Button } from "antd";
import styled from "styled-components";

import { config } from "./config";

const PostFormFooter = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Button>임시 저장</Button>
        <Button type="primary">포스트 생성</Button>
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
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 100px;
  align-items: center;
  justify-content: center;
  width: ${style.container.width}px;
  border-radius: 0 0 6px 6px;
  background: ${style.background};
`;

export default PostFormFooter;

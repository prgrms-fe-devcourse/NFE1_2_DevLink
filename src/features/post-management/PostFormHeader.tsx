import { Button } from "antd";
import styled from "styled-components";

import { config } from "./config";

const PostFormHeader = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Button>버튼</Button>
      </InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${style.bottom.height}px;
  background: green;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: ${style.container.width}px;
  background: powderblue;
`;

export default PostFormHeader;

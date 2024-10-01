import styled from "styled-components";

import PostFormInput from "./PostFormInput";
import PostPreview from "./PostPreview";
import { config } from "./config";
import { usePost } from "../../hooks/usePost";

const PostFormMain = () => {
  const {
    dispatch,
    state: { payload, status },
  } = usePost();

  const Component =
    status === "create" ? <PostFormInput data={payload} dispatch={dispatch} /> : <PostPreview />;

  return (
    <OuterContainer>
      <InnerContainer>{Component}</InnerContainer>
    </OuterContainer>
  );
};

const { style } = config;

const OuterContainer = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${style.container.width}px;
  padding: 0 40px;
  background: ${style.background};

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export default PostFormMain;

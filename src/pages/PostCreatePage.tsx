import { Layout } from "antd";

import { PostFormFooter, PostFormHeader, PostFormMain } from "../features/post-management";
import { PostProvider } from "../features/post-management/PostContext";
import { config } from "../features/post-management/config";
import styled from "styled-components";

const { Sider, Content } = Layout;

const PostCreatePage = () => {
  return (
    <Layout>
      <Sider collapsed></Sider>
      <Layout>
        <StyledContent>
          <PostForm />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

const PostForm = () => {
  return (
    <PostProvider>
      <PostFormHeader />
      <PostFormMain />
      <PostFormFooter />
    </PostProvider>
  );
};

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${config.style.outerBackground};
  padding: 40px;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

export default PostCreatePage;

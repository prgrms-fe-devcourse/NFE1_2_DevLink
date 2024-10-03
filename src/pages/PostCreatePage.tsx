import { Layout } from "antd";
import styled from "styled-components";

import { PostFormFooter, PostFormHeader } from "../features/post-management";
import { PostProvider } from "../features/post-management/PostContext";
import { config } from "../features/post-management/config";
import PostFormMain from "../features/post-management/PostFormMain";

const { Sider, Content } = Layout;

const PostCreatePage = () => {
  return (
    <Layout>
      <Sider collapsed></Sider>
      <PostForm />
    </Layout>
  );
};

const PostForm = () => {
  return (
    <Layout>
      <Container>
        <PostProvider>
          <PostFormHeader />
          <PostFormMain />
          <PostFormFooter />
        </PostProvider>
      </Container>
    </Layout>
  );
};

const Container = styled(Content)`
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

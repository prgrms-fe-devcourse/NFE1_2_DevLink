import { CSSProperties } from "react";
import { Layout } from "antd";

import { PostFormFooter, PostFormHeader, PostFormMain } from "../features/post-management";
import { PostProvider } from "../features/post-management/PostContext";
import { config } from "../features/post-management/config";

const { Sider, Content } = Layout;

const PostCreatePage = () => {
  return (
    <Layout>
      <Sider collapsed></Sider>
      <Layout>
        <Content style={contentStyle}>
          <PostForm />
        </Content>
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

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  background: config.style.outerBackground,
};

export default PostCreatePage;

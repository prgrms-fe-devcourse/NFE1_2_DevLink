import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import { config } from "../../features/post-management/config";

const { Sider, Content } = Layout;

const PostLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <Sider collapsed></Sider>
      <Layout>
        <Container>{children}</Container>
      </Layout>
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

export default PostLayout;

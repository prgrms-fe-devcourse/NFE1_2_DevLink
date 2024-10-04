import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import { config } from "../../features/post-management/config";
import NavigationBar from "../Navigation/NavigationBar";

const { Sider, Content } = Layout;

const PostLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <Sider collapsed>
        <NavigationBar />
      </Sider>
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
`;

export default PostLayout;

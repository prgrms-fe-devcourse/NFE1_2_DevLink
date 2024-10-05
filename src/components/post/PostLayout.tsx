import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import { config } from "../../features/post-management/config";
import { useTheme } from "../../theme/ThemeContext";

const { Sider, Content } = Layout;

const PostLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { darkMode } = useTheme();
  return (
    <Layout>
      <Sider collapsed></Sider>
      <Layout>
        <Container darkMode={darkMode}>{children}</Container>
      </Layout>
    </Layout>
  );
};

const Container = styled(Content)<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${config.style.outerBackground};
  padding: 40px;
  background-color: ${({ darkMode }) => (darkMode ? "#44474e" : "#F9F9F9")};

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

export default PostLayout;

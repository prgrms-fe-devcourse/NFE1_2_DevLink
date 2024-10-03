import React from "react";
import styled from "styled-components";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";

import { PostPayload } from "./type";
import CodeRenderer from "../../components/post/CodeRender";

const { Meta } = Card;
interface PostPreviewProps {
  data: PostPayload;
}

const PostPreview: React.FC<PostPreviewProps> = ({ data: { code, title, summary } }) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Card
          title="Component.tsx"
          cover={
            <Flex>
              <CodeRenderer data={code} />
            </Flex>
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}>
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={title}
            description={summary}
          />
        </Card>
      </InnerContainer>
    </OuterContainer>
  );
};

const config = {
  style: {
    maxWidth: 610,
    backgroundColor: "gray",
  },
};

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${config.style.backgroundColor};
  padding: 10px;
`;

const InnerContainer = styled.div`
  flex: 1;
  max-width: ${config.style.maxWidth}px;
  overflow: hidden;
`;

export default PostPreview;

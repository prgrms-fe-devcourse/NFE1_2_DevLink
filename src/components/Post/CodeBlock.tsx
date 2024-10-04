import React from "react";
import styled from "styled-components";
import { Typography, Switch, Button } from "antd";
import { CodeOutlined, CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Highlight } from "prism-react-renderer";
// import vsLight from "prism-react-renderer/themes/vsLight";

// import { vsDark } from "prism-react-renderer/themes";

// import theme from "prism-react-renderer/themes/vsDark"; // 원하는 테마를 선택

// Post 타입 정의
interface Post {
  code: string;
  language: string;
  preview: string;
}

interface CodeBlockProps {
  post: Post;
  code: string;
  language?: string;
}

// Container 컴포넌트에 대한 Props 타입 정의
interface ContainerProps {
  $language?: string; // $ prefix로 변경하여 DOM에 전달되지 않도록 함
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "javascript", post }) => {
  const [showPreview, setShowPreview] = useState<boolean>(true); // 토글 스위치 상태 관리

  // 코드 복사 기능 추가
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      console.log("코드가 복사되었습니다.");
    });
  };

  // 토글 스위치 상태 변경 핸들러
  const handleToggle = (checked: boolean) => {
    setShowPreview(checked); // 스위치 상태에 따라 showPreview 상태를 업데이트
  };

  return (
    <Container $language={language}>
      <HeaderWrapper>
        <LeftContainer>
          <CodeOutlined style={{ marginRight: "8px" }} />
          <Typography.Text style={{ color: "#B4B4B4" }}>{language}</Typography.Text>
        </LeftContainer>
        <RightContainer>
          <CopyButton icon={<CopyOutlined />} onClick={() => handleCopyCode(post?.code || "")}>
            코드 복사
          </CopyButton>
          {/* 토글 스위치 */}
          <SwitchContainer>
            <SwitchText>{showPreview ? "Preview" : "Code"}</SwitchText>
            <Switch checked={showPreview} onChange={handleToggle} />
          </SwitchContainer>
        </RightContainer>
      </HeaderWrapper>
      {showPreview ? (
        <PreviewContent>
          {post?.preview ? <p>{post.preview}</p> : <p>렌더링이 실패했습니다.</p>}
        </PreviewContent>
      ) : (
        <Highlight code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <StyledPre className={className} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <StyledCode key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </StyledPre>
          )}
        </Highlight>
        // <StyledPre>
        //   <StyledCode>{code}</StyledCode>
        // </StyledPre>
      )}
    </Container>
  );
};

// styled components
const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 619px;
  flex-direction: column;
  background-color: #f6f8fa;
  border-radius: 8px;
  margin: 16px 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  padding: 10px 20px 10px 20px;
  /* background-color: #f1f3f4; */
  background-color: #2f2f2f;
  color: #b4b4b4;
  /* border-bottom: 1px solid #e1e4e8; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CopyButton = styled(Button)`
  background-color: #2f2f2f;
  color: #b4b4b4;
  border: none;
  &:hover {
    background-color: #777;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px; /* 복사 버튼과의 간격 추가 */
`;

const SwitchText = styled.span`
  margin-right: 8px;
  font-size: 18px;
`;

const PreviewContent = styled.div`
  padding: 20px;
  margin: 0;
  overflow: auto;
  background-color: inherit;
  flex-grow: 1;
`;

//preformatted text : 줄바꿈, 공백 유지 -> 코드 블록, 서식 있는 텍스트에 사용
const StyledPre = styled.pre`
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  width: 100%;
  height: 100%;
`;

//Code 태그 : 고정 폭 폰트 적용 -> pre랑 함께 코드 블록으로 사용
const StyledCode = styled.code`
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
`;

export default CodeBlock;

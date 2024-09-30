import { Typography } from "antd";
import styled from "styled-components";
import { Editor, EditorProps } from "@monaco-editor/react";
import { TitleProps } from "antd/es/typography/Title";

interface CodeInputProps {
  onChange: (code?: string) => void;
}

const config = {
  label: "CODE SANDBOX",
  text: 5 as TitleProps["level"],
  code: {
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
    fontSize: 14,
  } as EditorProps["options"],
};

/**
 * CodeInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 코드를 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 본문 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const CodeInput: React.FC<CodeInputProps> = ({ onChange }) => {
  return (
    <Container>
      <Typography.Title level={config.text}>{config.label}</Typography.Title>
      <CodeSandBox>
        <Editor
          onChange={onChange}
          language="typescript"
          theme="vs-dark"
          value={"function helloWorld() {\n  console.log('Hello, World!');\n}"}
          options={config.code}
        />
      </CodeSandBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CodeSandBox = styled.section`
  width: 100%;
  height: 100%;
  background: papayawhip;
`;

export default CodeInput;

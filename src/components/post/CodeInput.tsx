import { useRef } from "react";
import styled from "styled-components";
import { Button, Flex, Tooltip, Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import { FormatPainterOutlined } from "@ant-design/icons";
import { editor } from "monaco-editor";

import { formatCode } from "../../utils/formatCode";
import CodeEditor from "./CodeEditor";

type CodeInputConfig = {
  text: {
    fontLevel: TitleProps["level"];
    tooltip: string;
    format: string;
    title: string;
  };
};

interface CodeInputProps {
  onChange: (code?: string) => void;
  value: string;
  config?: CodeInputConfig;
}

const defaultConfig = {
  text: {
    fontLevel: 5 as TitleProps["level"],
    tooltip: "코드 포맷팅",
    format: "Format",
    title: "Component.tsx",
  },
};

/**
 * CodeInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 코드를 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 본문 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const CodeInput: React.FC<CodeInputProps> = ({ onChange, value, config = defaultConfig }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const onFormatHandler = async () => {
    if (!editorRef.current) return;

    const unformattedCode = editorRef.current.getValue();
    const formattedCode = await formatCode(unformattedCode);

    if (formattedCode.code !== null) {
      editorRef.current.setValue(formattedCode.code);
    }
  };

  return (
    <Container>
      <Flex justify="space-between" align="end">
        <Typography.Title level={config.text.fontLevel}>{config.text.title}</Typography.Title>
        <Tooltip title={config.text.tooltip}>
          <Button type="text" icon={<FormatPainterOutlined />} onClick={onFormatHandler}>
            {config.text.format}
          </Button>
        </Tooltip>
      </Flex>
      <CodeEditor onChange={onChange} data={value} ref={editorRef} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default CodeInput;

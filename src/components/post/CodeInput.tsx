import { useRef } from "react";
import styled from "styled-components";
import { Button, Flex, Tooltip, Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import { FormatPainterOutlined } from "@ant-design/icons";
import { editor } from "monaco-editor";
import { Editor, EditorProps, Monaco } from "@monaco-editor/react";

import { formatCode } from "../../utils/formatCode";

interface CodeInputProps {
  onChange: (code?: string) => void;
}

const config = {
  text: {
    size: 5 as TitleProps["level"],
    tooltip: "코드 포맷팅",
    format: "Format",
  },
  code: {
    language: "typescript",
    theme: "vs-dark",
    options: {
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      fontSize: 14,
    },
    path: "Component.tsx",
    defaultValue:
      "const Component = () => {\n  return (\n    <div style={styles}>\n      <h1>Hello World</h1>\n    </div>\n  );\n};\n\nconst styles = {};\n",
    loading: <Typography.Text type="warning">에디터 준비중...</Typography.Text>,
  } as EditorProps,
};

/**
 * CodeInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 코드를 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 본문 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const CodeInput: React.FC<CodeInputProps> = ({ onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const onMountHandler = handleEditorWillMount((editor) => {
    editorRef.current = editor;
  });
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
        <Typography.Title level={config.text.size}>{config.code.path}</Typography.Title>
        <Tooltip title={config.text.tooltip}>
          <Button type="text" icon={<FormatPainterOutlined />} onClick={onFormatHandler}>
            {config.text.format}
          </Button>
        </Tooltip>
      </Flex>

      <CodeSandBox>
        <Editor onChange={onChange} onMount={onMountHandler} {...config.code} />
      </CodeSandBox>
    </Container>
  );
};

const handleEditorWillMount = (callback: (arg: editor.IStandaloneCodeEditor) => void) => {
  return (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: "React.createElement",
      reactNamespace: "React",
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
    });

    callback(editor);
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CodeSandBox = styled.section`
  width: 100%;
  height: 100%;
  background: #1e1e1e;
`;

export default CodeInput;

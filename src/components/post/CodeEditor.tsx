import { Editor, EditorProps, Monaco } from "@monaco-editor/react";
import styled from "styled-components";
import { Typography } from "antd";
import { useEffect, useRef } from "react";
import { editor } from "monaco-editor";

interface CodeEditorProps {
  onChange?: (code?: string) => void;
  data?: string;
  config?: EditorProps;
}

const defaultConfig: EditorProps = {
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
  loading: <Typography.Text type="warning">에디터 준비중...</Typography.Text>,
};

/**
 * `CodeEditor` 컴포넌트는 사용자가 코드를 편집할 수 있는 코드 에디터를 제공합니다.
 * 주어진 설정(config)과 데이터를 바탕으로 에디터를 초기화하고, 사용자의 입력에 따라 onChange 이벤트를 발생시킵니다.
 *
 * @component
 *
 * @param {CodeEditorProps} props - 컴포넌트에 전달되는 props 객체
 * @param {function} props.onChange - 사용자가 코드를 변경할 때 호출되는 콜백 함수
 * @param {string} [props.data] - 에디터에 기본적으로 보여줄 코드 (선택 사항)
 * @param {object} [props.config] - 에디터의 설정을 정의하는 객체 (선택 사항)
 *
 * @returns {JSX.Element} - 코드 에디터 UI를 렌더링하는 JSX 엘리먼트
 *
 * @example
 * ```jsx
 * const handleCodeChange = (newCode) => {
 *   console.log("Changed code:", newCode);
 * };
 *
 * const config = {
 *   language: 'javascript',
 *   theme: 'vs-dark',
 *   fontSize: 14,
 * };
 *
 * <CodeEditor onChange={handleCodeChange} data={"console.log('Hello, World!');"} config={config} />
 * ```
 */
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, data, config }) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isMount = useRef(false);

  useEffect(() => {
    if (isMount.current === true) return;

    isMount.current = true;

    if (data && editorRef.current) {
      editorRef.current.setValue(data);
    }
  }, [data]);

  const onMountHandler = handleEditorWillMount((editor) => {
    editorRef.current = editor;
  });

  return (
    <Container>
      <Editor {...mergedConfig} onChange={onChange} onMount={onMountHandler} defaultValue={data} />
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

const Container = styled.section`
  width: 100%;
  height: 100%;
  background: #1e1e1e;
`;

export default CodeEditor;

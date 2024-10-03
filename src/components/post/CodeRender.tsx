import JSXParser from "react-jsx-parser";
import styled from "styled-components";
import { Flex } from "antd";
import { useEffect, useRef, useState } from "react";

type Config = {
  error: ErrorConfig;
};

const defaultConfig: Config = {
  error: {
    parse: "SyntaxError: Failed to parse code string.",
    color: "red",
  },
};

interface CodeRendererProps {
  data: string;
  config?: Config;
}

/**
 * `CodeRenderer` 컴포넌트는 문자열 형식으로 주어진 JSX 코드와 스타일을 파싱하여
 * 이를 화면에 렌더링하는 역할을 합니다.
 *
 * @param {CodeRendererProps} props - 컴포넌트에 전달되는 props 객체
 * @param {string} props.data - JSX 및 스타일을 포함한 코드 문자열
 * @param {object} props.config.error.parse - 에러 이벤트가 발생했을때 명시할 에러 텍스트
 * @param {object} props.config.error.color - 에러 텍스트 색상 (기본값: red)
 *
 * @returns {JSX.Element} - 파싱된 JSX와 스타일이 적용된 컴포넌트를 렌더링
 *
 * @example
 * ```jsx
 * const strCode = `
 * const Component = () => {
 *  return (
 *     <div style={styles}>
 *       <h1>Hello World</h1>
 *     </div>
 *   );
 * };
 *
 * const styles = {
 *   backgroundColor: "lightblue",
 *   margin: "20px",
 *   padding: "20px",
 *   borderRadius: "5px",
 *   textAlign: "center",
 * };
 * `;
 *
 * <CodeRenderer data={strCode} />
 * ```
 *
 * 추출된 JSX 코드를 `JSXParser`를 통해 렌더링하고, `styles`는 컴포넌트에 바인딩됩니다.
 */
const CodeRenderer: React.FC<CodeRendererProps> = ({ data, config = defaultConfig }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { code, styles, isError } = extractCodeAndStyles(data);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleScrollCheck = () => {
        setIsScrollable(container.scrollWidth > container.clientWidth);
      };

      handleScrollCheck();

      window.addEventListener("resize", handleScrollCheck);
      return () => {
        window.removeEventListener("resize", handleScrollCheck);
      };
    }
  }, []);

  const { color, parse } = config.error;

  return (
    <CodeRenderContainer ref={containerRef} $scrollable={isScrollable}>
      {isError ? (
        <CodeRenderError reason={{ error: parse }} color={color} />
      ) : (
        <JSXParser
          jsx={code}
          bindings={{ styles }}
          renderError={(error) => <CodeRenderError reason={error} color={color} />}
        />
      )}
    </CodeRenderContainer>
  );
};

type ErrorConfig = {
  parse: string;
  color: string;
};

interface CodeRenderErrorProps {
  reason: {
    error: string;
  };
  color: string;
}

const CodeRenderError: React.FC<CodeRenderErrorProps> = ({ reason, color }) => {
  return (
    <Flex vertical>
      <CodeRenderErrorText color={color}>[Render Error!]</CodeRenderErrorText>
      <CodeRenderErrorText color={color}>{reason.error}</CodeRenderErrorText>
    </Flex>
  );
};

type ParserCodeState = {
  isError: boolean;
  code: string;
  styles: Record<string, string>;
};

const extractCodeAndStyles = (target: string) => {
  const state: ParserCodeState = { isError: false, code: "", styles: {} };
  const code = target;
  const styleMatch = code.match(/const styles = \{([\s\S]*?)\};/);
  const styleString = styleMatch
    ? styleMatch[0].replace("const styles = ", "").replace(/;/g, "")
    : "{}";
  const styles = new Function(`return (${styleString})`)();
  const match = code.match(/return\s*\(\s*([\s\S]*?)\s*\);/);

  if (!match) {
    state.isError = true;

    return state;
  }

  const [, parsedCode] = match;

  state.code = parsedCode;
  state.styles = styles;

  return state;
};

// 코드 렌더링 환경 컨테이너 구성 속성
const config = {
  style: {
    minHeight: 343,
    backgroundColor: "#f6f6f6",
  },
};

const CodeRenderContainer = styled.div<{ $scrollable?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: ${(props) => (props.$scrollable ? "flex-start" : "center")};
  align-items: center;
  overflow-x: scroll;
  min-height: ${config.style.minHeight}px;
  background-color: ${config.style.backgroundColor};
`;

const CodeRenderErrorText = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  text-align: center;
`;

export default CodeRenderer;

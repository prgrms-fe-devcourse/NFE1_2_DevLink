import React from "react";
import styled from "styled-components";
import JSXParser from "react-jsx-parser";

import { PostPayload } from "./type";
import { defaultCode } from "../../components/post/CodeInput";

interface PostPreviewProps {
  data: PostPayload;
}

const PostPreview: React.FC<PostPreviewProps> = ({ data: { code } }) => {
  const { parsedCode, styles } = parserCode(code);

  console.log(parsedCode, styles);
  return (
    <Container>
      <JSXParser jsx={parsedCode} bindings={{ styles }} />
    </Container>
  );
};

const parserCode = (target: string) => {
  const code = target || defaultCode;
  const styleMatch = code.match(/const styles = \{([\s\S]*?)\};/);
  const styleString = styleMatch
    ? styleMatch[0].replace("const styles = ", "").replace(/;/g, "")
    : "{}";
  const styles = new Function(`return (${styleString})`)();
  const match = code.match(/return\s*\(\s*([\s\S]*?)\s*\);/);

  if (!match) {
    throw new Error("sdf");
  }

  return { parsedCode: match[1], styles };
};

const Container = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: pink;
`;

export default PostPreview;

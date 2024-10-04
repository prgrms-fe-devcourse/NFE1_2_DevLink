import { CSSProperties } from "react";
import { Input, Typography } from "antd";

import { PostInputChangeHandler } from "./type";
import { TitleProps } from "antd/es/typography/Title";

interface CodeInputProps {
  onChange: PostInputChangeHandler<HTMLTextAreaElement>;
  value: string;
}

const config = {
  label: "MAIN TEXT",
  maxLength: 200,
  placeholder: "포스트 본문 내용을 작성해 주세요!",
  size: { height: 120, resize: "none" } as CSSProperties,
  text: 5 as TitleProps["level"],
};

/**
 * BodyTextInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 본문을 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const BodyTextInput: React.FC<CodeInputProps> = ({ onChange, value }) => {
  return (
    <div>
      <Typography.Title level={config.text}>{config.label}</Typography.Title>
      <Input.TextArea
        showCount
        maxLength={config.maxLength}
        onChange={onChange}
        placeholder={config.placeholder}
        style={config.size}
        value={value}
      />
    </div>
  );
};

export default BodyTextInput;

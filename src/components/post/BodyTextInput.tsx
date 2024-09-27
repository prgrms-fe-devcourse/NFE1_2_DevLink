import { Input, Typography } from "antd";

import { PostInputChangeHandler } from "./type";
import { CSSProperties } from "react";

interface CodeInputProps {
  onChange: PostInputChangeHandler<HTMLTextAreaElement>;
}

const config = {
  label: "MAIN TEXT",
  maxLength: 200,
  placeholder: "포스트 본문 내용을 작성해 주세요!",
  size: { height: 120, resize: "none" } as CSSProperties,
};

/**
 * BodyTextInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 본문을 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const BodyTextInput: React.FC<CodeInputProps> = ({ onChange }) => {
  return (
    <div>
      <Typography.Title level={3}>{config.label}</Typography.Title>
      <Input.TextArea
        showCount
        maxLength={config.maxLength}
        onChange={onChange}
        placeholder={config.placeholder}
        style={config.size}
      />
    </div>
  );
};

export default BodyTextInput;

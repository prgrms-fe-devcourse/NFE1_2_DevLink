import { Input, Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

import { PostInputChangeHandler } from "./type";

interface SummaryInputProps {
  onChange: PostInputChangeHandler<HTMLInputElement>;
  value: string;
}

const config = {
  label: "SUMMARY",
  count: {
    show: true,
    max: 25,
  },
  placeholder: "포스트 한줄 요약을 작성해 주세요!",
  text: 5 as TitleProps["level"],
};

/**
 * SummaryInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 한줄 요약을 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const SummaryInput: React.FC<SummaryInputProps> = ({ onChange, value }) => {
  return (
    <div>
      <Typography.Title level={config.text}>{config.label}</Typography.Title>
      <Input
        count={config.count}
        onChange={onChange}
        placeholder={config.placeholder}
        value={value}
      />
    </div>
  );
};

export default SummaryInput;

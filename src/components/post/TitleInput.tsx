import { Input, Typography } from "antd";

import { PostInputChangeHandler } from "./type";

interface TitleInputProps {
  onChange: PostInputChangeHandler<HTMLInputElement>;
}

const config = {
  label: "TITLE",
  count: {
    show: true,
    max: 50,
  },
  placeholder: "포스트 제목을 작성해 주세요!",
};

/**
 * TitleInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 제목을 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const TitleInput: React.FC<TitleInputProps> = ({ onChange }) => {
  return (
    <div>
      <Typography.Title level={3}>{config.label}</Typography.Title>
      <Input count={config.count} onChange={onChange} placeholder={config.placeholder} />
    </div>
  );
};

export default TitleInput;

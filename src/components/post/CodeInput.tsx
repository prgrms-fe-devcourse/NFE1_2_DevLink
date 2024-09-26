import { PostInputChangeHandler } from "./type";

interface CodeInputProps {
  onChange: PostInputChangeHandler<HTMLTextAreaElement>;
}

/**
 * CodeInput 컴포넌트
 *
 * 해당 컴포넌트는 포스트의 코드를 입력하기 위한 입력 폼입니다.
 * 사용자가 입력한 본문 내용은 `onChange` 핸들러를 통해 상위 컴포넌트로 전달됩니다.
 */
const CodeInput: React.FC<CodeInputProps> = ({ onChange }) => {
  return (
    <div>
      <textarea name="" id="" onChange={onChange}></textarea>
    </div>
  );
};

export default CodeInput;

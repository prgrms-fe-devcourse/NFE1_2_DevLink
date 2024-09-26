import { BodyTextInput, CodeInput, SummaryInput, TitleInput } from "../../components/post";
import { usePost } from "../../hooks/usePost";

/**
 * 제목
 * 코드 입력
 * 본문 텍스트
 * 한줄 요약
 *
 */
const PostForm = () => {
  const { state } = usePost();

  console.log(state);
  return (
    <main>
      <TitleInput />
      <CodeInput />
      <BodyTextInput />
      <SummaryInput />
    </main>
  );
};

export default PostForm;

import { useNavigate } from "react-router-dom";

// TODO: Remove this
const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/signin")}>로그인</button>
      <button onClick={() => navigate("/signup")}>회원가입</button>
      <button onClick={() => navigate("/")}>메인 페이지</button>
      <button onClick={() => navigate("/post/create")}>포스트 생성</button>
      <button onClick={() => navigate("/post/1")}>포스트 상세 (예시: postId = 1)</button>
      <button onClick={() => navigate("/post/modify/1")}>포스트 수정 (예시: postId = 1)</button>
      <button onClick={() => navigate("/profile/1")}>마이페이지 (예시: userId = 1)</button>
    </div>
  );
};

const MainPage = () => {
  return (
    <main>
      <div>MainPage</div>
      <NavigationButtons />
    </main>
  );
};

export default MainPage;

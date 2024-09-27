import styled from "styled-components";
import LoginBox from "../components/LoginBox";

interface UserData {
  email: string;
  password: string;
}

// 로그인 페이지 스타일 지정
const PageStyle = styled.div`
  width: "1920px";
  height: "1080px";
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 1px solid black; // 확인용
`;

const userData: UserData = {
  email: "",
  password: "",
};

const SignInPage = () => {
  return (
    <PageStyle>
      {/* SignInPage */}
      <LoginBox userData={userData}></LoginBox>
    </PageStyle>
  );
};

export default SignInPage;

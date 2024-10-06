import styled from "styled-components";
import LoginBox from "../components/LoginBox";
import { useTheme } from "../theme/ThemeContext";
interface UserData {
  email: string;
  password: string;
}

// 로그인 페이지 스타일 지정
const PageStyle = styled.div<{ $darkMode: boolean }>`
  width: 1920px;
  height: 1080px;
  background-color: ${({ $darkMode }) => ($darkMode ? "#44474e" : "#F9F9F9")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const userData: UserData = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const { darkMode } = useTheme();
  return (
    <PageStyle $darkMode={darkMode}>
      {/* SignInPage */}
      <LoginBox userData={userData}></LoginBox>
    </PageStyle>
  );
};

export default SignInPage;

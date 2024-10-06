import styled from "styled-components";
import SignupBox from "../components/SignupBox";

import { useTheme } from "../theme/ThemeContext";
interface UserData {
  email: string;
  fullName: string;
  password: string;
}
// 회원가입 페이지 스타일 지정
const PageStyle = styled.div<{ $darkMode: boolean }>`
  width: 1920px;
  height: 1080px;
  /* background-color: #f9f9f9; */
  background-color: ${({ $darkMode }) => ($darkMode ? "#44474e" : "#F9F9F9")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const userData: UserData = {
  email: "",
  fullName: "",
  password: "",
};

const SignUpPage = () => {
  const { darkMode } = useTheme();
  return (
    <PageStyle $darkMode={darkMode}>
      {/* SignUpPage */}
      <SignupBox userData={userData}></SignupBox>
    </PageStyle>
  );
};

export default SignUpPage;

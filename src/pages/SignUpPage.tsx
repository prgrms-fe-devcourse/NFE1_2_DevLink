import styled from "styled-components";
import SignupBox from "../components/SignupBox";

interface UserData {
  email: string;
  fullName: string;
  password: string;
}
// 회원가입 페이지 스타일 지정
const PageStyle = styled.div`
  width: 1920px;
  height: 1080px;
  background-color: #f9f9f9;
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
  return (
    <PageStyle>
      {/* SignUpPage */}
      <SignupBox userData={userData}></SignupBox>
    </PageStyle>
  );
};

export default SignUpPage;

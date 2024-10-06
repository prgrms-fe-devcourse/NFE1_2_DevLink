// components/EditProfileModal.tsx
import React from "react";
import styled from "styled-components";
import devlinkLogo from "../../assets/images/devlinkLogo.png";
import { useTheme } from "../../theme/ThemeContext";

// 모달 스타일
const EditProfileModal = styled.div`
  position: absolute;
  top: 250px;
  width: 500px;
  height: 600px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: #fff;
`;

// 로고 스타일
const LogoStyle = styled.img`
  width: 200px;
  height: 60px;
  margin-bottom: 30px;
`;

// 입력 필드 스타일
const InputStyle = styled.input`
  width: 400px;
  padding: 15px;
  margin-top: 30px;
`;

// 요구 사항 스타일
const Requirements = styled.div<{ $darkMode: boolean }>`
  margin-left: 5px;
  margin-top: 5px;
  width: 300px;
  font-size: 12px;
  opacity: 0.6;
  color: black;
`;

// 제출 박스 스타일
const SubmitBox = styled.div`
  display: flex;
  width: 180px;
  justify-content: space-between;
  margin-left: 220px;
  margin-top: 30px;
  button {
    width: 80px;
    text-align: center;
    align-items: center;
    border: 1px solid lightgray;
    background-color: #fff;
    cursor: pointer;
    color: black;
    &:hover {
      background-color: #cccccc;
    }
  }
`;

// EditProfileModal 컴포넌트의 props 타입 정의
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputFullName: string;
  setInputFullName: (value: string) => void;
  inputPassword: string;
  setInputPassword: (value: string) => void;
  inputCheckPassword: string;
  setInputCheckPassword: (value: string) => void;
  loginToken: string;
}

// EditProfileModal 컴포넌트
const EditProfileModalComponent: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  inputFullName,
  setInputFullName,
  inputPassword,
  setInputPassword,
  inputCheckPassword,
  setInputCheckPassword,
  loginToken,
}) => {
  const validateFields = () => {
    if (inputFullName.length < 1 || inputFullName.length > 8) {
      alert("이름은 1~8자 사이여야 합니다.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/; // 영문, 숫자, 특수문자 포함, 8~16자
    if (!passwordRegex.test(inputPassword)) {
      alert("비밀번호는 영문+특수문자+숫자를 포함한 8~16자여야 합니다.");
      return false;
    }

    if (inputPassword !== inputCheckPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true; // 모든 검사가 통과하면 true 반환
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        await updateUser(); // 사용자 업데이트
        await updatePassword(); // 비밀번호 업데이트
        onSubmit(e); // 유효성 검사 통과 시에만 제출
        onClose();
        alert("수정 완료");
      } catch (error) {
        console.error("수정 중 오류 발생:", error);
      }
    }
  };

  const updateUser = async () => {
    const requestBody = {
      fullName: inputFullName,
      username: "", // 사용자 이름은 필요에 따라 추가하세요
    };

    const response = await fetch(
      "https://kdt.frontend.5th.programmers.co.kr:5004/settings/update-user",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON 형식임을 명시
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`사용자 업데이트 실패: ${errorText}`);
    }
  };

  const updatePassword = async () => {
    const requestBody = {
      password: inputPassword,
    };

    const response = await fetch(
      "https://kdt.frontend.5th.programmers.co.kr:5004/settings/update-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`비밀번호 변경 실패: ${errorText}`);
    }
  };

  if (!isOpen) return null;

  const { darkMode } = useTheme();

  return (
    <EditProfileModal>
      <LogoStyle src={devlinkLogo} alt="devlinkLogo" />
      <form onSubmit={handleSubmit}>
        <InputStyle
          type="text"
          name="fullName"
          placeholder="이름"
          value={inputFullName}
          onChange={(e) => setInputFullName(e.target.value)}
        />
        <Requirements $darkMode={darkMode}>이름은 1~8자 사이여야 합니다.</Requirements>

        <InputStyle
          type="password"
          name="password"
          placeholder="비밀번호"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <Requirements $darkMode={darkMode}>
          비밀번호는 영문+특수문자+숫자를 포함한 8~16자여야 합니다.
        </Requirements>

        <InputStyle
          type="password"
          name="password-check"
          placeholder="비밀번호 확인"
          value={inputCheckPassword}
          onChange={(e) => setInputCheckPassword(e.target.value)}
        />
        <Requirements $darkMode={darkMode}>
          비밀번호는 영문+특수문자+숫자를 포함한 8~16자여야 합니다.
        </Requirements>

        <SubmitBox>
          <button type="button" onClick={onClose}>
            수정 취소
          </button>
          <button type="submit">수정 완료</button>
        </SubmitBox>
      </form>
    </EditProfileModal>
  );
};

export default EditProfileModalComponent;

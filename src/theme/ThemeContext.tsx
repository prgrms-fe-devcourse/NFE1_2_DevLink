import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

// 컨텍스트 값 타입 정의
interface ThemeContextType {
  darkMode: boolean;
  themeToggle: () => void;
}

// Context 초기화
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 전역 스타일 지정
const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
     

   body {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     transition: background-color 0.5s, color 0.5s;
     background-color: ${({ darkMode }) => (darkMode ? "#44474e" : "#F9F9F9")};
     color: ${({ darkMode }) => (darkMode ? "white" : "black")};
   }

   button {
     transition: background-color 0.5s, color 0.5s;
     background-color: ${({ darkMode }) => (darkMode ? "#444" : "#F9F9F9")};
     color: ${({ darkMode }) => (darkMode ? "white" : "#444")};
   }

`;

// Context에 대한 Provider 생성
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // state
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage에 저장된 다크모드 값 가져오기
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true";
  });

  // themeToggle 함수 : 다크모드 false - true 토글
  const themeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // 다크모드 값이 바뀔때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      {/* 전역 스타일 컴포넌트를 darkMode 상태에 따라 적용함 */}
      <GlobalStyle darkMode={darkMode}></GlobalStyle>
      <ThemeContext.Provider value={{ darkMode, themeToggle }}>{children}</ThemeContext.Provider>
    </>
  );
};

// 컨텍스트에 접근하는 훅 생성
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("context 에러");
  }
  return context;
};

export { ThemeContext, ThemeProvider, useTheme };

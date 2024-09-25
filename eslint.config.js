import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] }, // dist 폴더 제외
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended], // 기본 권장 설정 적용
    files: ["**/*.{ts,tsx}"], // TS 및 TSX 파일에 적용
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 사용
      globals: globals.browser, // 브라우저 전역 객체 추가
    },
    plugins: {
      "react-hooks": reactHooks, // React Hooks 관련 규칙 적용
      "react-refresh": reactRefresh, // React Refresh 관련 규칙 적용
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙 사용
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }], // 컴포넌트만 export 허용
      "prefer-const": "error", // const 사용 권장
      "no-var": "error", // var 사용 금지
      "object-shorthand": ["error", "always"], // 객체 축약 구문 사용
      "no-new-object": "error", // new Object() 금지
      "no-array-constructor": "error", // new Array() 금지
      "prefer-destructuring": ["error", { object: true, array: true }], // 구조 분해 할당 권장
      "prefer-template": "error", // 템플릿 리터럴 사용 권장
      "arrow-parens": ["error", "always"], // 화살표 함수 괄호 항상 사용
      "no-loop-func": "error", // 루프 내 함수 선언 금지
      "no-param-reassign": ["error", { props: true }], // 파라미터 재할당 금지
      "dot-notation": "error", // 점 표기법 사용
      "no-duplicate-imports": "error", // 중복 import 금지
      quotes: ["error", "double"], // 쌍따옴표 사용
    },
  },
  // Redux 관련 설정
  {
    files: ["src/**/*Slice.ts"], // Slice 파일에만 적용
    rules: {
      "no-param-reassign": ["error", { props: false }], // props 재할당 허용
    },
  }
);

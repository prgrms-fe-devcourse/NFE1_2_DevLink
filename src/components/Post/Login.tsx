import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();
      console.log("로그인 성공:", data.token);

      // 토큰 저장
      localStorage.setItem("userToken", data.token);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <p>admin@programmers.co.kr</p>
      <p>programmers</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;

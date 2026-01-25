import React, { useState } from 'react'; // useState 추가
import { Link } from "react-router-dom";

const Login = () => {
  // 1. 비밀번호 표시 여부 상태 관리
  const [showPassword, setShowPassword] = useState(false);

  // 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/bg.png')",
          filter: "blur(4px)"
        }}
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 w-full max-w-[440px] bg-white/80 backdrop-blur-lg rounded-[20px] shadow-xl p-12 flex flex-col items-center">
        <div className="mb-14">
          <Link to="/">
            <img src="/ducamiLogo.svg" alt="DUCAMI" className="h-10 object-contain" />
          </Link>
        </div>

        <form className="w-full space-y-8">
          <div className="relative border-b border-gray-400">
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              className="w-full py-2 bg-transparent outline-none text-[15px] placeholder-gray-400"
            />
          </div>

          <div className="relative border-b border-gray-400 flex items-center">
            {/* 2. type을 상태값에 따라 password 또는 text로 변경 */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요."
              className="w-full py-2 bg-transparent outline-none text-[15px] placeholder-gray-400"
            />
            {/* 3. 버튼 클릭 시 상태 반전 */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 text-gray-400 hover:text-[#43B9A9] transition-colors"
            >
              {showPassword ? (
                /* 눈 취소 아이콘 (단순화 버전) */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* 기존 눈 모양 기초 */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  {/* 대각선 추가 (취소선) */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18" />
                </svg>
              ) : (
                /* 눈 아이콘 (기존 유지) */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#43B9A9] hover:bg-[#38a394] text-white font-medium py-3.5 rounded-[8px] transition-all mt-4 text-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from '../api/axios'; // axios 인스턴스 경로에 맞게 수정하세요
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  // 1. 입력값 및 UI 상태 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 2. 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginPromise = axios.post('/api/admin/login', { username, password });

    toast.promise(loginPromise, {
      loading: '로그인 중...',
      success: (res) => {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
        return '로그인 성공';
      },
      error: (err) => {
        if (err.response?.status === 401) return '아이디 또는 비밀번호가 틀렸습니다.';
        return '서버 연결에 실패했습니다.';
      }
    });
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

        <form className="w-full space-y-8" onSubmit={handleLogin}>
          <div className="relative border-b border-gray-400">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요."
              className="w-full py-2 bg-transparent outline-none text-[15px] placeholder-gray-400"
              required
            />
          </div>

          <div className="relative border-b border-gray-400 flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요."
              className="w-full py-2 bg-transparent outline-none text-[15px] placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 text-gray-400 hover:text-[#43B9A9] transition-colors"
            >
              {showPassword ? (
                /* 눈 취소 아이콘 */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18" />
                </svg>
              ) : (
                /* 눈 아이콘 */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* 에러 메시지 표시 구역 */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; // useLocation 추가

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 현재 페이지가 로그인 페이지인지 확인 (MainLayout의 로직과 통일)
  const isLoginPage = location.pathname.toLowerCase() === '/login';

  const getNavLink = ({ isActive }) => 
    isActive 
      ? "text-[#43B9A9] text-md font-medium transition-colors"
      : `${isLoginPage ? 'text-white/80' : 'text-[#030303]'} text-md font-medium hover:text-[#43B9A9] transition-colors`;

  return (
    <header className={`w-full h-20 fixed top-0 z-50 transition-all ${
      isLoginPage ? "bg-transparent border-none" : "bg-[#F5F5F5] border-b border-gray-200"
    }`}>
      <div className="h-full flex items-center justify-between px-6">

        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img 
            src="/ducamiLogo.svg" 
            alt="Ducami Logo" 
            className="h-10 w-auto object-contain" 
          />
        </Link>
        
        {/* 1. PC 버전 메뉴 */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={getNavLink}>동아리 소개</NavLink>
          <NavLink to="/activity" className={getNavLink}>주요활동</NavLink>
          <NavLink to="/noti" className={getNavLink}>공지사항</NavLink>
          <NavLink to="/experience" className={getNavLink}>체험하기</NavLink>
          <Link to="/login" className="bg-[#43B9A9] text-white px-6.5 py-2 rounded-[5px]">로그인</Link>
        </nav>

        {/* 2. 모바일 햄버거 버튼 */}
        <button 
          className={`md:hidden p-2 focus:outline-none ${isLoginPage ? 'text-white' : 'text-[#030303]'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 3. 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#F5F5F5] border-b border-gray-200 shadow-lg flex flex-col px-6 py-6 space-y-6">
          <NavLink to="/" className={getNavLink} onClick={() => setIsMenuOpen(false)}>동아리 소개</NavLink>
          <NavLink to="/activity" className={getNavLink} onClick={() => setIsMenuOpen(false)}>주요활동</NavLink>
          <NavLink to="/noti" className={getNavLink} onClick={() => setIsMenuOpen(false)}>공지사항</NavLink>
          <NavLink to="/experience" className={getNavLink} onClick={() => setIsMenuOpen(false)}>체험하기</NavLink>
          <Link to="/login" className="bg-[#43B9A9] text-white px-6.5 py-2 rounded-[5px] text-center w-fit" onClick={() => setIsMenuOpen(false)}>
            로그인
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
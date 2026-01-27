import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname.toLowerCase() === '/login';

  const getNavLink = ({ isActive }) => 
    isActive 
      ? "text-[#43B9A9] text-lg font-bold transition-colors"
      : `${isLoginPage ? 'md:text-white/80' : 'text-[#030303]'} text-lg font-medium hover:text-[#43B9A9] transition-colors`;

  return (
    <>
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
          
          {/* PC 버전 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={getNavLink}>동아리 소개</NavLink>
            <NavLink to="/activity" className={getNavLink}>주요활동</NavLink>
            <NavLink to="/noti" className={getNavLink}>공지사항</NavLink>
            <NavLink to="/experience" className={getNavLink}>체험하기</NavLink>
            <Link to="/login" className="bg-[#43B9A9] text-white px-6.5 py-2 rounded-[5px]">로그인</Link>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button 
            className={`md:hidden p-2 z-[60] focus:outline-none ${
              isMenuOpen ? 'text-[#030303]' : (isLoginPage ? 'text-white' : 'text-[#030303]')
            }`}
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
      </header>

      {/* 모바일 사이드바 */}
      <div 
        className={`fixed inset-0 z-[55] md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >

        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={() => setIsMenuOpen(false)}
        />

        {/* 사이드바 */}
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col p-8 pt-24 space-y-6">
            <NavLink to="/" className={getNavLink} onClick={() => setIsMenuOpen(false)}>동아리 소개</NavLink>
            <NavLink to="/activity" className={getNavLink} onClick={() => setIsMenuOpen(false)}>주요활동</NavLink>
            <NavLink to="/noti" className={getNavLink} onClick={() => setIsMenuOpen(false)}>공지사항</NavLink>
            <NavLink to="/experience" className={getNavLink} onClick={() => setIsMenuOpen(false)}>체험하기</NavLink>
            <hr className="border-gray-100" />
            <Link 
              to="/login" 
              className="bg-[#43B9A9] text-white px-6 py-3 rounded-[5px] text-center font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
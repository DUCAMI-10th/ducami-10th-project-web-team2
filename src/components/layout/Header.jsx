import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(auth);
    };
    checkAuth();
  }, [location]);

  const isLoginPage = location.pathname.toLowerCase() === '/login';

  const handleLogout = async () => {
    try {
      await axios.post('/api/admin/logout');
      toast.success('로그아웃 되었습니다.');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

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
            <img src="/ducamiLogo.svg" alt="Ducami Logo" className="h-10 w-auto object-contain" />
          </Link>
          
          {/* PC 버전 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={getNavLink}>동아리 소개</NavLink>
            <NavLink to="/activity" className={getNavLink}>주요활동</NavLink>
            <NavLink to="/noti" className={getNavLink}>공지사항</NavLink>
            <NavLink to="/experience" className={getNavLink}>체험하기</NavLink>
            
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-[#64748b] text-white px-6.5 py-2 rounded-[5px] cursor-pointer">로그아웃</button>
            ) : (
              <Link to="/login" className="bg-[#43B9A9] text-white px-6.5 py-2 rounded-[5px]">로그인</Link>
            )}
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className={`w-6 h-6 ${isLoginPage ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* 모바일 사이드바 메인 레이아웃 */}
      <div className={`fixed inset-0 z-[55] md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* 배경 오버레이 */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />

        {/* 사이드바 본체 */}
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col p-8 pt-24 space-y-6">
            <NavLink to="/" className="text-lg font-medium text-[#030303]" onClick={() => setIsMenuOpen(false)}>동아리 소개</NavLink>
            <NavLink to="/activity" className="text-lg font-medium text-[#030303]" onClick={() => setIsMenuOpen(false)}>주요활동</NavLink>
            <NavLink to="/noti" className="text-lg font-medium text-[#030303]" onClick={() => setIsMenuOpen(false)}>공지사항</NavLink>
            <NavLink to="/experience" className="text-lg font-medium text-[#030303]" onClick={() => setIsMenuOpen(false)}>체험하기</NavLink>
            
            <hr className="border-gray-100" />
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="bg-[#64748b] text-white px-6 py-3 rounded-[5px] text-center font-medium"
              >
                로그아웃
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#43B9A9] text-white px-6 py-3 rounded-[5px] text-center font-medium"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
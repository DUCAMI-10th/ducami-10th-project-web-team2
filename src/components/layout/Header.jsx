import { Link, NavLink } from 'react-router-dom';
const Header = () => {

  const getNavLink = ({ isActive }) => 
    isActive 
      ? "text-[#43B9A9] text-md font-medium transition-colors"
      : "text-[#030303] text-md font-medium hover:text-[#43B9A9] transition-colors";

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 z-50">
      <Link to="/">
        <img 
          src="/ducamiLogo.svg" 
          alt="Ducami Logo" 
          className="h-10 w-auto object-contain" 
        />
      </Link>
      
      <nav className="space-x-8">
        <NavLink to="/" className={getNavLink}>동아리 소개</NavLink>
        <NavLink to="/activity" className={getNavLink}>주요활동</NavLink>
        <NavLink to="/noti" className={getNavLink}>공지사항</NavLink>
        <NavLink to="/experience" className={getNavLink}>체험하기</NavLink>
        <Link to="/" className="bg-[#43B9A9] text-white px-6.5 py-2.5 rounded-[5px]">로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
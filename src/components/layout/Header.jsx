import { Link } from 'react-router-dom';
const Header = () => {
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
        <Link to="/" className="text-[#030303] text-md font-medium">동아리 소개</Link>
        <Link to="/about" className="text-[#030303] text-md font-medium">주요활동</Link>
        <Link to="/about" className="text-[#030303] text-md font-medium">공지사항</Link>
        <Link to="/about" className="text-[#030303] text-md font-medium">체험하기</Link>
        <Link to="/about" className="bg-[#43B9A9] text-white px-6.5 py-2.5 rounded-[5px]">로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
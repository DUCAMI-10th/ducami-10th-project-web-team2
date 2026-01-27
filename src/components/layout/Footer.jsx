const Footer = () => {
  return (
    <footer className="w-full bg-[#1e1e1e] text-[#a0a0a0] py-12 px-6 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-sm md:text-base">
          <span className="font-bold text-gray-300">Ducami(두카미)</span>
          <span>대구소프트웨어마이스터고등학교</span>
        </div>

        <div className="flex gap-10 md:gap-16 text-sm md:text-base font-medium">
          <div className="flex flex-col gap-3">
            <a href="https://www.instagram.com/duco_ami/" className="text-gray-300 hover:text-white transition-colors">인스타그램</a>
            <a href="https://blog.naver.com/ducami" className="text-gray-300 hover:text-white transition-colors">블로그</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
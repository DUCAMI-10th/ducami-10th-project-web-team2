import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* 헤더 높이(h-16 = 4rem = 64px)만큼 띄워줌 */}
      <main className="flex-1 pt-20 bg-[#F5F5F5]">
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
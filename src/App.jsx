import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import MainActivity from '@/pages/MainActivity';
import Noti from '@/pages/Noti';
import Experience from '@/pages/Experience';
import NotiWrite from '@/pages/NotiWrite';
import NotiDetails from '@/pages/NotiDetails'
import Login from '@/pages/Login';

function App() {
  return (
    <Routes>
      {/* 1. 헤더와 푸터가 있는 페이지들 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='/activity' element={<MainActivity />} />
        <Route path='/noti' element={<Noti />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/noti/write' element={<NotiWrite />} />
        <Route path="/noti/:id" element={<NotiDetails />} />
      </Route>

      {/* 2. 헤더/푸터 없이 독립적인 페이지 (Login) */}
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
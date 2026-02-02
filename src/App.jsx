import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import MainActivity from '@/pages/MainActivity';
import Noti from '@/pages/Noti';
import Experience from '@/pages/Experience';
import NotiWrite from '@/pages/NotiWrite';
import NotiDetails from '@/pages/NotiDetails'
import Login from '@/pages/Login';
import { Navigate, Outlet } from 'react-router-dom'; // 추가
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path='/activity' element={<MainActivity />} />
          <Route path='/noti' element={<Noti />} />
          <Route path='/experience' element={<Experience />} />
          <Route path="/noti/:id" element={<NotiDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/noti/write' element={<NotiWrite />} />
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>
    </>

  );
}

export default App;
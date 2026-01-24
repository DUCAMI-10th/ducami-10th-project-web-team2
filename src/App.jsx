import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import MainActivity from '@/pages/MainActivity'
import Noti from '@/pages/Noti'
import Experience from '@/pages/Experience'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='/activity' element={<MainActivity />} />
        <Route path='/noti' element={<Noti />} />
        <Route path='/experience' element={<Experience />} />
      </Route>
    </Routes>
  );
}

export default App;
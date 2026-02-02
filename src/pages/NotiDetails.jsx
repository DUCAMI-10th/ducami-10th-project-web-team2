import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const NotiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(auth);

    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/notice/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("상세 조회 실패:", err);
        alert("존재하지 않는 게시글입니다.");
        navigate('/noti');
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleDelete = async () => {

    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/api/notice/${id}`);
      toast.success("삭제되었습니다.");
      navigate('/noti');
    } catch (err) {
      toast.error("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  if (!data) return <div className="py-20 text-center">로딩 중...</div>;
  return (
    <div className="w-full min-h-screen pb-20">
      <div className="max-w-screen-lg mx-auto px-6 pt-20">
        <div className="mb-10 flex justify-between items-start">
          <div>
            <p className="text-[#43B9A9] font-bold mb-2 text-lg">공지사항</p>
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-[#868E96] text-base">{data.date || data.createdAt?.split('T')[0]}</p>
          </div>

          {/* --- 어드민 전용 버튼 구역 --- */}
          {isLoggedIn && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/noti/write?edit=${id}`)} // 수정 페이지로 ID 전달
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 font-medium transition-all"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium transition-all"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 mb-10"></div>

        <div
          className="prose max-w-none text-gray-800 leading-relaxed min-h-[400px] mb-20"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* 하단 네비게이션 생략 (기존과 동일) */}
      </div>
    </div>
  );
};

export default NotiDetail;
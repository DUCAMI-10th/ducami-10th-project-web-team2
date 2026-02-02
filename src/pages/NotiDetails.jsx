import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const NotiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(auth);

    const fetchDetailAndNav = async () => {
      try {
        // 1. 현재 게시글 상세 정보 가져오기
        const response = await axios.get(`/api/notice/${id}`);
        setData(response.data);

        // 2. 전체 목록을 가져와서 이전글/다음글 계산 (최신순 정렬 기준)
        const listRes = await axios.get('/api/notice');
        const sortedList = listRes.data.sort((a, b) => b.id - a.id);
        
        const currentIndex = sortedList.findIndex(post => post.id === parseInt(id));
        
        // 최신순 정렬(b.id - a.id)이므로: 
        // Index - 1 이 더 최신글(다음글), Index + 1 이 더 이전글(이전글)
        setNextPost(currentIndex > 0 ? sortedList[currentIndex - 1] : null);
        setPrevPost(currentIndex < sortedList.length - 1 ? sortedList[currentIndex + 1] : null);

      } catch (err) {
        console.error("상세 조회 실패:", err);
        toast.error("존재하지 않는 게시글입니다."); // alert -> toast 변경
        navigate('/noti');
      }
    };

    fetchDetailAndNav();
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

  if (!data) return <div className="py-20 text-center text-gray-500">로딩 중...</div>;

  return (
    <div className="w-full min-h-screen pb-20">
      <div className="max-w-screen-lg mx-auto px-6 pt-20">
        <div className="mb-10 flex justify-between items-start">
          <div>
            <p className="text-[#43B9A9] font-bold mb-2 text-lg">공지사항</p>
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-[#868E96] text-base">{data.date || data.createdAt?.split('T')[0]}</p>
          </div>

          {isLoggedIn && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/noti/write?edit=${id}`)}
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

        <div className="border-t border-b border-gray-200">
          <div 
            onClick={() => nextPost && navigate(`/noti/${nextPost.id}`)}
            className={`flex items-center py-5 px-4 border-b border-gray-100 group ${nextPost ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50'}`}
          >
            <span className="w-24 text-gray-500 font-medium flex items-center gap-1">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
              다음글
            </span>
            <p className="flex-1 text-gray-900 group-hover:text-[#43B9A9] transition-colors truncate ml-4">
              {nextPost ? nextPost.title : "다음 게시글이 없습니다."}
            </p>
          </div>

          <div 
            onClick={() => prevPost && navigate(`/noti/${prevPost.id}`)}
            className={`flex items-center py-5 px-4 group ${prevPost ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50'}`}
          >
            <span className="w-24 text-gray-500 font-medium flex items-center gap-1">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              이전글
            </span>
            <p className="flex-1 text-gray-900 group-hover:text-[#43B9A9] transition-colors truncate ml-4">
              {prevPost ? prevPost.title : "이전 게시글이 없습니다."}
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate('/noti')}
            className="px-12 py-3 bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 transition-all"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotiDetail;
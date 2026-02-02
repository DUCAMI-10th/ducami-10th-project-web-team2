import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // axios 경로 확인 필요

const Noti = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [notices, setNotices] = useState([]); // 서버에서 받아온 전체 데이터
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // 1. 로그인 상태 확인
    const auth = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(auth);

    // 2. 공지사항 목록 데이터 가져오기 (API 연결)
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/notice');

        // 데이터 정렬: id가 큰 숫자가 위로 오도록 역순 정렬 (최신순)
        const sortedData = response.data.sort((a, b) => b.id - a.id);

        setNotices(sortedData);
      } catch (err) {
        console.error("공지사항 목록 로딩 실패:", err);
        // 에러 시 빈 배열 처리 혹은 안내
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 페이지네이션 계산
  const totalCount = notices.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="py-20 text-center text-gray-500 font-medium">로딩 중입니다...</div>;

  return (
    <div className="w-full">
      {/* 상단 배너 섹션 */}
      <div className="bg-[#43B9A9] w-full py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
          <div className="text-white space-y-2">
            <p className="text-sm md:text-base font-medium opacity-90">공지사항</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              DUCAMI에서<br />
              공지사항을 안내해드려요.
            </h1>
          </div>
          <img
            src='/speaker.png'
            className="hidden md:block w-48 h-48 lg:w-64 lg:h-64 object-contain"
            alt="speaker"
          />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-4 flex justify-between items-end">
          <p className="text-gray-900 font-bold text-lg">
            총 <span className="text-[#43B9A9]">{totalCount}</span>개
          </p>

          {/* 어드민 전용 글쓰기 버튼 */}
          {isLoggedIn && (
            <Link
              to='/noti/write'
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#43B9A9] text-[#43B9A9] rounded-md hover:bg-[#43B9A9] hover:text-white transition-all font-bold shadow-sm"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              글쓰기
            </Link>
          )}
        </div>

        <div className="border-t-2 border-gray-200"></div>

        {/* 공지사항 목록 리스트 */}
        <div className="flex flex-col">
          {currentItems.length > 0 ? (
            currentItems.map((notice) => (
              <div
                key={notice.id}
                onClick={() => navigate(`/noti/${notice.id}`)}
                className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 md:w-20 text-center text-gray-500 font-medium group-hover:text-[#43B9A9]">
                  {notice.id}
                </div>
                <div className="flex-1 px-4">
                  <p className="text-gray-900 font-medium text-base md:text-lg line-clamp-1 group-hover:text-[#43B9A9]">
                    {notice.title}
                  </p>
                </div>
                <div className="w-24 md:w-32 text-right text-gray-400 text-sm md:text-base">
                  {/* 상세페이지와 동일하게 createdAt 처리 */}
                  {notice.createdAt ? notice.createdAt.split('T')[0] : notice.date}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">
              등록된 공지사항이 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 (데이터가 있을 때만 표시) */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-[#43B9A9]"}`}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm transition-colors ${currentPage === number
                  ? "bg-gray-900 text-white font-bold"
                  : "text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-[#43B9A9]"}`}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="pb-20"></div>
    </div>
  );
};

export default Noti;
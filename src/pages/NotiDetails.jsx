import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NotiDetail = () => {
  const { id } = useParams(); // URL의 :id 값을 가져옴
  const navigate = useNavigate();
  
  // 1. 데이터 상태 관리
  const [data, setData] = useState(null);

  // 2. id가 바뀔 때마다 데이터를 새로 불러오는 로직
  useEffect(() => {
    // 실제 환경에서는 여기서 axios.get(`/api/notice/${id}`)를 호출합니다.
    // 지금은 테스트용 더미 데이터를 id에 맞춰 생성합니다.
    const currentId = Number(id);
    
    const mockData = {
      title: `공지사항 테스트 게시물 ${currentId}번 입니다.`,
      date: "2025-07-16",
      content: `<p>${currentId}번 게시물의 상세 내용입니다. 왈랄라 블라블라...</p>`,
      // 이전 글: 현재 ID보다 1 작은 글 (1번이면 없음)
      prevPost: currentId > 1 ? { id: currentId - 1, title: `공지사항 테스트 게시물 ${currentId - 1}번 입니다.` } : null,
      // 다음 글: 현재 ID보다 1 큰 글 (35번이 마지막이면 없음)
      nextPost: currentId < 35 ? { id: currentId + 1, title: `공지사항 테스트 게시물 ${currentId + 1}번 입니다.` } : null,
    };

    setData(mockData);
    
    // 페이지 이동 시 스크롤을 최상단으로 올림 (매우 중요)
    window.scrollTo(0, 0); 
  }, [id]); // ★ id가 변경될 때마다 이 함수가 다시 실행됨

  // 데이터가 로딩 중일 때 예외 처리
  if (!data) return <div className="py-20 text-center">로딩 중...</div>;

  return (
    <div className="w-full min-h-screen pb-20">
      <div className="max-w-screen-lg mx-auto px-6 pt-20">
        {/* 상단 제목 영역 */}
        <div className="mb-10">
          <p className="text-[#43B9A9] font-bold mb-2 text-lg">공지사항</p>
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-[#868E96] text-base">{data.date}</p>
        </div>

        <div className="border-t border-gray-100 mb-10"></div>

        {/* 본문 영역 */}
        <div 
          className="prose max-w-none text-gray-800 leading-relaxed min-h-[400px] mb-20"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* 하단 네비게이션 (이전글/다음글) */}
        <div className="mt-20 border-t-2 border-gray-200">
          {[
            { label: "다음 글", post: data.nextPost },
            { label: "이전 글", post: data.prevPost }
          ].map((item, index) => (
            <div 
              key={index}
              onClick={() => item.post && navigate(`/noti/${item.post.id}`)}
              className={`flex items-center py-5 border-b border-gray-200 transition-all ${
                item.post ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="w-24 md:w-32 text-gray-500 font-bold shrink-0">{item.label}</div>
              <div className="flex-1 truncate pr-4 text-gray-900 font-medium">
                {item.post ? item.post.title : "작성된 글이 없습니다."}
              </div>
              <div className="text-gray-400 text-sm">{item.post ? data.date : ""}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotiDetail;
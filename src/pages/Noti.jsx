import React, { useState } from 'react';

const Noti = () => {
  const noticeData = Array.from({ length: 35 }, (_, i) => ({
    id: 35 - i,
    title: `공지사항 테스트 게시물 ${35 - i}번 입니다.`,
    date: "2025-07-16"
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalCount = noticeData.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noticeData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="bg-[#43B9A9] w-screen relative left-[50%] -translate-x-1/2 py-16 md:py-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center relative z-10">
          <div className="text-white space-y-2">
            <p className="text-sm md:text-base font-medium opacity-90">공지사항</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              DUCAMI에서<br />
              공지사항을 안내해드려요.
            </h1>
          </div>
          <img 
            src='/speaker.png' 
            className="hidden md:block md:w-96 md:h-96 lg:w-[240px] lg:h-[240px] relative object-contain" 
            alt="speaker"
          />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-16">
        
        <div className="mb-4">
          <p className="text-gray-900 font-bold text-lg">
            총 <span>{totalCount}</span>개
          </p>
        </div>

        <div className="border-t-2 border-gray-200"></div>

        <div className="flex flex-col">
          {currentItems.map((notice) => (
            <div 
              key={notice.id} 
              className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-12 md:w-20 text-center text-gray-500 font-medium">
                {notice.id}
              </div>
              <div className="flex-1 px-4">
                <p className="text-gray-900 font-medium text-base md:text-lg line-clamp-1">
                  {notice.title}
                </p>
              </div>
              <div className="w-24 md:w-32 text-right text-gray-400 text-sm md:text-base">
                {notice.date}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center space-x-2">
          
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-[#43B9A9]"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm transition-colors ${
                currentPage === number
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>

      <div className="pb-20"></div>
    </div>
  );
};

export default Noti;
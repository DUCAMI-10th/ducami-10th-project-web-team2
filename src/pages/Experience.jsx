import { useState, useRef, useEffect } from 'react';
import { FaRegKeyboard, FaRotateRight } from "react-icons/fa6"; // 새로고침 아이콘 추가
import { FaCamera } from "react-icons/fa";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [codeData, setCodeData] = useState(null); // 서버에서 받은 전체 객체 저장
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchRandomCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/code/random`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('코드를 불러오는데 실패했습니다.');
      
      const data = await response.json();
      setCodeData(data);
      setUserInput(""); 
    } catch (error) {
      console.error("Error fetching code:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      fetchRandomCode();
    }
  }, [activeTab]);

  const targetCode = codeData?.code || "";
  const lineCount = targetCode.split('\n').length;
  const dynamicHeight = Math.max(250, lineCount * 40 + 60);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      setUserInput(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const renderCode = () => {
    if (!targetCode) return null;
    return targetCode.split("").map((char, index) => {
      const userChar = userInput[index];
      let style = "text-gray-600";
      if (userChar !== undefined) {
        if (userChar === char) {
          if (/[0-9]/.test(char)) style = "text-[#b5cea8]";
          else if (/[\(\)]/.test(char)) style = "text-[#ffd700]";
          else if (/[a-b]/.test(char)) style = "text-[#9cdcfe]";
          else if (/[\+\=]/.test(char)) style = "text-[#dcdcaa]";
          else if (/[map|int|input|print|split]/.test(char)) style = "text-[#4ec9b0]";
          else style = "text-white";
        } else {
          style = "bg-red-500 text-white";
        }
      }
      const isCurrent = userInput.length === index;
      return (
        <span key={index} className={`${style} ${isCurrent ? "border-b-2 border-white" : ""}`}>
          {char === "\n" ? "\n" : char}
        </span>
      );
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 상단 헤더 섹션 (기존과 동일) */}
      <div className="bg-[#43B9A9] w-full py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
          <div className="text-white space-y-2">
            <p className="text-sm md:text-base font-medium opacity-90">체험하기</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              DUCAMI에서<br />
              다양한 기능을 체험해보세요.
            </h1>
          </div>
          <img src='/Activity_icon.png' className="hidden md:block w-48 h-48 lg:w-64 lg:h-64 object-contain" alt="icon" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {/* 탭 메뉴 */}
        <div className="flex justify-center border-b border-gray-200 mb-10">
          <button onClick={() => setActiveTab(1)} className={`flex-1 md:flex-none px-6 md:px-12 py-5 text-base md:text-lg font-bold relative flex items-center justify-center gap-3 cursor-pointer transition-all ${activeTab === 1 ? 'text-[#43B9A9]' : 'text-gray-400'}`}>
            <FaRegKeyboard className="text-xl" />
            <span>코드 따라치기</span>
            {activeTab === 1 && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#43B9A9]" />}
          </button>
          <button onClick={() => setActiveTab(2)} className={`flex-1 md:flex-none px-6 md:px-12 py-5 text-base md:text-lg font-bold relative flex items-center justify-center gap-3 cursor-pointer transition-all ${activeTab === 2 ? 'text-[#43B9A9]' : 'text-gray-400'}`}>
            <FaCamera className="text-xl" />
            <span>인생두컷</span>
            {activeTab === 2 && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#43B9A9]" />}
          </button>
        </div>

        {activeTab === 1 ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end px-2">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 font-bold text-lg">
                  {codeData?.title || "python_practice.py"}
                  <span className="ml-3 text-xs font-normal bg-gray-200 px-2 py-1 rounded text-gray-600">{codeData?.category}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={fetchRandomCode} className="text-gray-500 hover:text-[#43B9A9] flex items-center gap-1 text-sm transition-colors">
                  <FaRotateRight className={loading ? "animate-spin" : ""} /> 다른 코드 하기
                </button>
                <span className={`text-sm md:text-base ${userInput === targetCode ? "text-[#43B9A9] font-bold" : "text-gray-400 animate-pulse"}`}>
                  {userInput === targetCode ? "🎉 미션 완료!" : "가이드 코드를 따라 치세요"}
                </span>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 mb-2"></div>

            {loading ? (
              <div className="w-full h-[300px] bg-[#1e1e1e] rounded-2xl flex items-center justify-center text-white">
                코드를 불러오는 중...
              </div>
            ) : (
              <div className="relative w-full bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden flex font-mono transition-all duration-500" style={{ height: `${dynamicHeight}px` }}>
                <div className="relative flex-1 p-6 md:p-8 text-base md:text-xl leading-relaxed tracking-tight">
                  <pre className="absolute inset-0 p-6 md:p-8 m-0 whitespace-pre-wrap break-all pointer-events-none" style={{ zIndex: 1 }}>
                    {renderCode()}
                  </pre>
                  <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    autoFocus
                    className="absolute inset-0 w-full h-full p-6 md:p-8 bg-transparent text-transparent outline-none border-none resize-none caret-white whitespace-pre-wrap break-all"
                    style={{ zIndex: 2, fontInherit: 'inherit' }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 인생두컷 탭 (기존과 동일) */
          <div className="w-full shadow-2xl rounded-2xl overflow-hidden bg-white">
            <iframe src='https://insaeng2cut.netlify.app/' className="w-full h-[500px] md:h-[750px] border-none" title="인생두컷 체험" allow="camera; microphone; display-capture; autoplay" />
          </div>
        )}
      </div>
      <div className="pb-20"></div>
    </div>
  );
};

export default Experience;